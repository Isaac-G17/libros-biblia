import { Book } from '../../models/book.model';

export function sortByOrder(books: readonly Book[]): Book[] {
  return [...books].sort((a, b) => a.order - b.order);
}

/** Si la división tiene más libros que `maxSize`, toma un tramo contiguo al azar. */
export function pickOrderingWindow(
  sortedBooks: readonly Book[],
  maxSize: number,
  random: () => number = Math.random,
): Book[] {
  if (sortedBooks.length <= maxSize) return [...sortedBooks];
  const maxStart = sortedBooks.length - maxSize;
  const start = Math.floor(random() * (maxStart + 1));
  return sortedBooks.slice(start, start + maxSize);
}