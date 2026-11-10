import { Injectable, computed, inject, signal } from '@angular/core';
import { AppMode, ProgressState, createEmptyState } from '../../models/progress.model';
import { ProgressRepository } from '../persistence/progress.repository';
import { nextBox } from '../utils/leitner';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly repository = inject(ProgressRepository);
  private readonly state = signal<ProgressState>(createEmptyState());

  readonly mode = computed(() => this.state().preferences.mode);
  readonly cards = computed(() => this.state().cards);
  readonly soundEnabled = computed(
    () => this.state().preferences.soundEnabled ?? this.mode() === 'kids',
  );

  async init(): Promise<void> {
    this.state.set(await this.repository.load());
  }

  setMode(mode: AppMode): void {
    this.update((s) => ({ ...s, preferences: { ...s.preferences, mode } }));
  }

  setSoundEnabled(soundEnabled: boolean): void {
    this.update((s) => ({ ...s, preferences: { ...s.preferences, soundEnabled } }));
  }

  /** Marca un libro como visto (caja 1) sin pisar progreso existente. */
  markSeen(bookId: string): void {
    this.update((s) =>
      s.cards[bookId]
        ? s
        : {
            ...s,
            cards: {
              ...s.cards,
              [bookId]: { box: 1, reviews: 0, lastReviewedAt: new Date().toISOString() },
            },
          },
    );
  }

  recordReview(bookId: string, knew: boolean): void {
    this.update((s) => {
      const previous = s.cards[bookId];
      return {
        ...s,
        cards: {
          ...s.cards,
          [bookId]: {
            box: nextBox(previous?.box ?? 0, knew),
            reviews: (previous?.reviews ?? 0) + 1,
            lastReviewedAt: new Date().toISOString(),
          },
        },
      };
    });
  }

  private update(change: (state: ProgressState) => ProgressState): void {
    const next = change(this.state());
    this.state.set(next);
    void this.repository.save(next);
  }
}