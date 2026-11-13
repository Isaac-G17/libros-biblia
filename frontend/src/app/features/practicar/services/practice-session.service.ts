import { Injectable, computed, inject, signal } from '@angular/core';
import { BooksService } from '../../../core/services/books.service';
import { ProgressService } from '../../../core/services/progress.service';
import { SoundService } from '../../../core/services/sound.service';
import { pickCards } from '../../../core/utils/leitner';
import { PracticeContext, Question, buildQuestion, shuffle } from '../../../core/utils/practice';

const ROUND_SIZE = { kids: 8, adult: 10 } as const;

/** Estado de una ronda de preguntas. Se provee por página: cada visita arranca limpia. */
@Injectable()
export class PracticeSessionService {
  private readonly books = inject(BooksService);
  private readonly progress = inject(ProgressService);
  private readonly sound = inject(SoundService);

  private readonly _questions = signal<readonly Question[]>([]);
  private readonly _index = signal(0);
  private readonly _selectedId = signal<string | null>(null);
  private readonly _correctCount = signal(0);

  readonly index = this._index.asReadonly();
  readonly selectedId = this._selectedId.asReadonly();
  readonly correctCount = this._correctCount.asReadonly();

  readonly total = computed(() => this._questions().length);
  readonly current = computed<Question | undefined>(() => this._questions()[this._index()]);
  readonly answered = computed(() => this._selectedId() !== null);
  readonly isLast = computed(() => this._index() === this.total() - 1);
  readonly finished = computed(() => this.total() > 0 && this._index() >= this.total());

  start(divisionId?: string): void {
    const cards = this.progress.cards();
    const allBooks = this.books.books();
    const kids = this.progress.mode() === 'kids';
    const seen = allBooks.filter((b) => cards[b.id] && (!divisionId || b.divisionId === divisionId));

    const context: PracticeContext = {
      books: allBooks,
      divisions: this.books.divisions(),
      seenIds: new Set(Object.keys(cards)),
      adult: !kids,
    };

    const chosen = pickCards(seen, cards, kids ? ROUND_SIZE.kids : ROUND_SIZE.adult);
    this._questions.set(shuffle(chosen).map((book) => buildQuestion(book, context)));
    this._index.set(0);
    this._selectedId.set(null);
    this._correctCount.set(0);
  }

  choose(choiceId: string): void {
    const question = this.current();
    if (!question || this.answered()) return;

    const correct = choiceId === question.correctId;
    this._selectedId.set(choiceId);
    this.progress.recordReview(question.bookId, correct);
    this.sound.play(correct ? 'correct' : 'wrong');
    if (correct) this._correctCount.update((n) => n + 1);
  }

  next(): void {
    this._selectedId.set(null);
    this._index.update((i) => i + 1);
    if (this.finished()) this.sound.play('done');
  }
}