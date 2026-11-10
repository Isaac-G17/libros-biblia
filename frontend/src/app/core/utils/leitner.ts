import { Book } from '../../models/book.model';
import { Box, CardProgress, MASTERED_BOX } from '../../models/progress.model';

/** Acierto: sube una caja (máx. dominado). Fallo: vuelve a la caja 1. */
export function nextBox(box: Box, knew: boolean): Box {
  return knew ? (Math.min(box + 1, MASTERED_BOX) as Box) : 1;
}

/**
 * Elige `size` libros priorizando los menos dominados.
 * `random` es inyectable para poder testearlo de forma determinista.
 */
export function pickCards(
  books: readonly Book[],
  progress: Readonly<Record<string, CardProgress>>,
  size: number,
  random: () => number = Math.random,
): Book[] {
  return books
    .map((book) => ({ book, box: progress[book.id]?.box ?? 0, tiebreak: random() }))
    .sort((a, b) => a.box - b.box || a.tiebreak - b.tiebreak)
    .slice(0, size)
    .map((item) => item.book);
}