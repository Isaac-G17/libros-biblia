import { Injectable, computed, inject, signal } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BooksService } from '../../../core/services/books.service';
import { ProgressService } from '../../../core/services/progress.service';
import { SoundService } from '../../../core/services/sound.service';
import { shuffle } from '../../../core/utils/practice';
import { pickOrderingWindow, sortByOrder } from '../../../core/utils/ordering';

const MAX_SIZE = { kids: 5, adult: 8 } as const;
const MIN_SIZE = 3;

/** Estado de una ronda de Ordenar. Se provee por página: cada visita arranca limpia. */
@Injectable()
export class OrderingSessionService {
  private readonly books = inject(BooksService);
  private readonly progress = inject(ProgressService);
  private readonly sound = inject(SoundService);

  private divisionId: string | null = null;
  private readonly _canonical = signal<readonly Book[]>([]);
  private readonly _pool = signal<readonly Book[]>([]);
  private readonly _placed = signal<readonly Book[]>([]);
  private readonly _revealed = signal(false);

  readonly canonical = this._canonical.asReadonly();
  readonly pool = this._pool.asReadonly();
  readonly placed = this._placed.asReadonly();
  readonly revealed = this._revealed.asReadonly();

  readonly total = computed(() => this._canonical().length);
  readonly available = computed(() => this.total() >= MIN_SIZE);
  readonly allPlaced = computed(() => this.total() > 0 && this._placed().length === this.total());

  /** ✓/✗ por posición; vacío hasta que se revela. */
  readonly results = computed<readonly boolean[]>(() => {
    if (!this._revealed()) return [];
    const canon = this._canonical();
    return this._placed().map((book, i) => book.id === canon[i]?.id);
  });
  readonly correctCount = computed(() => this.results().filter(Boolean).length);

  start(divisionId: string): void {
    const kids = this.progress.mode() === 'kids';
    const seenIds = new Set(Object.keys(this.progress.cards()));
    const seen = sortByOrder(
      this.books.books().filter((b) => b.divisionId === divisionId && seenIds.has(b.id)),
    );

    this.divisionId = divisionId;
    this._canonical.set(pickOrderingWindow(seen, kids ? MAX_SIZE.kids : MAX_SIZE.adult));
    this._pool.set(shuffle(this._canonical()));
    this._placed.set([]);
    this._revealed.set(false);
  }

  place(bookId: string): void {
    if (this._revealed()) return;
    const book = this._pool().find((b) => b.id === bookId);
    if (!book) return;
    this._pool.update((pool) => pool.filter((b) => b.id !== bookId));
    this._placed.update((placed) => [...placed, book]);
  }

  undoLast(): void {
    if (this._revealed() || this._placed().length === 0) return;
    const placed = this._placed();
    const last = placed[placed.length - 1];
    this._placed.set(placed.slice(0, -1));
    this._pool.update((pool) => [...pool, last]);
  }

  check(): void {
    if (!this.allPlaced() || this._revealed()) return;
    this._revealed.set(true);

    const canon = this._canonical();
    this._placed().forEach((book, i) => this.progress.recordReview(book.id, book.id === canon[i]?.id));
    this.sound.play('done'); // terminar la ronda siempre suena bien: nunca se castiga el error
  }

  playAgain(): void {
    if (this.divisionId) this.start(this.divisionId);
  }
}