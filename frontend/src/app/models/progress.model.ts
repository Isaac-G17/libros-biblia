export type AppMode = 'kids' | 'adult';

/** Caja de Leitner: 0 = nuevo, 3 = dominado. */
export type Box = 0 | 1 | 2 | 3;
export const MASTERED_BOX: Box = 3;

export interface CardProgress {
  readonly box: Box;
  readonly reviews: number;
  readonly lastReviewedAt: string; // ISO 8601
}

export interface ProgressPreferences {
  readonly mode: AppMode | null;
  /** null = sin elegir: por defecto suena en modo niños y no en adultos. */
  readonly soundEnabled: boolean | null;
}

export interface ProgressState {
  readonly version: 1;
  readonly preferences: ProgressPreferences;
  readonly cards: Readonly<Record<string, CardProgress>>;
}

export const createEmptyState = (): ProgressState => ({
  version: 1,
  preferences: { mode: null, soundEnabled: null },
  cards: {},
});