import { Injectable, computed, inject, signal } from '@angular/core';
import { BooksService } from '../../../core/services/books.service';
import { ProgressService } from '../../../core/services/progress.service';
import { SoundService } from '../../../core/services/sound.service';
import { buildPairs, Pair } from '../../../core/utils/matching';
import { shuffle } from '../../../core/utils/practice';

const PAIR_SIZE = { kids: 4, adult: 6 } as const;
const MIN_PAIRS = 3;

interface WrongFlash {
  readonly leftId: string;
  readonly rightId: string;
}

/** Estado de una ronda de Emparejar. Se provee por página: cada visita arranca limpia. */
@Injectable()
export class MatchingSessionService {
  private readonly books = inject(BooksService);
  private readonly progress = inject(ProgressService);
  private readonly sound = inject(SoundService);

  private readonly _pairs = signal<readonly Pair[]>([]);
  private readonly _leftOrder = signal<readonly Pair[]>([]);
  private readonly _rightOrder = signal<readonly Pair[]>([]);
  private readonly _matchedIds = signal<ReadonlySet<string>>(new Set());
  private readonly _wrongIds = signal<ReadonlySet<string>>(new Set());
  private readonly _selectedLeftId = signal<string | null>(null);
  private readonly _selectedRightId = signal<string | null>(null);
  private readonly _wrongFlash = signal<WrongFlash | null>(null);

  readonly matchedPairs = computed(() => this._pairs().filter((p) => this._matchedIds().has(p.bookId)));
  readonly leftItems = computed(() => this._leftOrder().filter((p) => !this._matchedIds().has(p.bookId)));
  readonly rightItems = computed(() => this._rightOrder().filter((p) => !this._matchedIds().has(p.bookId)));
  readonly selectedLeftId = this._selectedLeftId.asReadonly();
  readonly selectedRightId = this._selectedRightId.asReadonly();
  readonly wrongFlash = this._wrongFlash.asReadonly();

  readonly total = computed(() => this._pairs().length);
  readonly available = computed(() => this.total() >= MIN_PAIRS);
  readonly finished = computed(() => this.total() > 0 && this._matchedIds().size === this.total());
  /** Menos aciertos cuanto más intentos equivocados hubo; nunca penaliza dos veces el mismo libro. */
  readonly correctCount = computed(() => {
    const wrong = this._pairs().filter((p) => this._wrongIds().has(p.bookId)).length;
    return Math.max(0, this.total() - wrong);
  });

  start(divisionId?: string): void {
    const kids = this.progress.mode() === 'kids';
    const cards = this.progress.cards();
    const seen = this.books.books().filter((b) => cards[b.id] && (!divisionId || b.divisionId === divisionId));
    const size = kids ? PAIR_SIZE.kids : PAIR_SIZE.adult;

    const pairs = buildPairs(seen, this.books.divisions(), kids, size);
    this._pairs.set(pairs);
    this._leftOrder.set(shuffle(pairs));
    this._rightOrder.set(shuffle(pairs));
    this._matchedIds.set(new Set());
    this._wrongIds.set(new Set());
    this._selectedLeftId.set(null);
    this._selectedRightId.set(null);
    this._wrongFlash.set(null);
  }

  /** Cada ficha usa el id del libro como clave: si ambos lados coinciden, es la pareja correcta. */
  selectCard(side: 'left' | 'right', bookId: string): void {
    if (this._matchedIds().has(bookId) || this._wrongFlash()) return;

    const selected = side === 'left' ? this._selectedLeftId : this._selectedRightId;
    selected.set(selected() === bookId ? null : bookId);
    this.evaluate();
  }

  playAgain(): void {
    this.start();
  }

  private evaluate(): void {
    const leftId = this._selectedLeftId();
    const rightId = this._selectedRightId();
    if (leftId === null || rightId === null) return;

    if (leftId === rightId) {
      this._matchedIds.update((ids) => new Set([...ids, leftId]));
      this._selectedLeftId.set(null);
      this._selectedRightId.set(null);
      this.progress.recordReview(leftId, true);
      this.sound.play(this.finished() ? 'done' : 'correct');
      return;
    }

    this._wrongFlash.set({ leftId, rightId });
    this._wrongIds.update((ids) => new Set([...ids, leftId, rightId]));
    this.sound.play('wrong');
    // Se muestra el error un instante y se liberan las fichas, sin penalizar más allá del intento.
    setTimeout(() => {
      this._wrongFlash.set(null);
      this._selectedLeftId.set(null);
      this._selectedRightId.set(null);
    }, 600);
  }
}