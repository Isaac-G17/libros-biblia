import { Injectable, computed, inject } from '@angular/core';
import { Division } from '../../models/book.model';
import { MASTERED_BOX } from '../../models/progress.model';
import { BooksService } from './books.service';
import { ProgressService } from './progress.service';

export interface DivisionProgress {
  readonly division: Division;
  readonly total: number;
  readonly seen: number;
  readonly mastered: number;
}

export type NextStep =
  | { readonly kind: 'start' | 'continue'; readonly division: Division }
  | { readonly kind: 'practice' };

/** Progreso de aprendizaje derivado del canon y de las tarjetas guardadas. */
@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private readonly books = inject(BooksService);
  private readonly progress = inject(ProgressService);

  readonly divisions = computed<readonly DivisionProgress[]>(() => {
    const cards = this.progress.cards();
    const all = this.books.books();

    return this.books.divisions().map((division) => {
      const inDivision = all.filter((b) => b.divisionId === division.id);
      return {
        division,
        total: inDivision.length,
        seen: inDivision.filter((b) => cards[b.id]).length,
        mastered: inDivision.filter((b) => cards[b.id]?.box === MASTERED_BOX).length,
      };
    });
  });

  readonly totalBooks = computed(() => this.books.books().length);
  readonly seenCount = computed(() => this.divisions().reduce((sum, d) => sum + d.seen, 0));
  readonly masteredCount = computed(() => this.divisions().reduce((sum, d) => sum + d.mastered, 0));
  readonly percentSeen = computed(() =>
    this.totalBooks() > 0 ? Math.round((this.seenCount() / this.totalBooks()) * 100) : 0,
  );

  readonly nextStep = computed<NextStep | null>(() => {
    const list = this.divisions();
    if (list.length === 0) return null;

    const pending = list.find((d) => d.seen < d.total);
    if (!pending) return { kind: 'practice' };
    return { kind: this.seenCount() === 0 ? 'start' : 'continue', division: pending.division };
  });
}