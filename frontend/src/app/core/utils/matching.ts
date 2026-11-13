import { Book, Division } from '../../models/book.model';
import { shuffle } from './practice';

export interface Pair {
  readonly bookId: string;
  readonly left: string;
  readonly right: string;
}

type Random = () => number;

export function buildPairs(
  books: readonly Book[],
  divisions: readonly Division[],
  kids: boolean,
  size: number,
  random: Random = Math.random,
): Pair[] {
  const divisionName = new Map(divisions.map((d) => [d.id, d.name]));
  const pool = shuffle(books, random);

  if (!kids) {
    // En adultos el tema es único por libro: no hace falta restricción de división.
    return pool.slice(0, size).map((book) => ({ bookId: book.id, left: book.name, right: book.theme }));
  }

  // En niños, cada pareja usa una división distinta para que no haya dos fichas con el mismo texto.
  const usedDivisions = new Set<string>();
  const pairs: Pair[] = [];
  for (const book of pool) {
    if (usedDivisions.has(book.divisionId)) continue;
    usedDivisions.add(book.divisionId);
    pairs.push({ bookId: book.id, left: book.name, right: divisionName.get(book.divisionId) ?? '' });
    if (pairs.length === size) break;
  }
  return pairs;
}