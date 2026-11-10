import { Book } from '../models/book.model';
import { Box, CardProgress } from '../models/progress.model';
import { nextBox, pickCards } from './leitner';

const book = (id: string): Book => ({
  id, order: 1, name: id, testament: 'AT', divisionId: 'x', author: '-', chapters: 1, theme: '-',
});
const card = (box: Box): CardProgress => ({ box, reviews: 1, lastReviewedAt: '2026-01-01T00:00:00Z' });

describe('leitner', () => {
  it('sube de caja al acertar sin pasar del máximo', () => {
    expect(nextBox(0, true)).toBe(1);
    expect(nextBox(3, true)).toBe(3);
  });

  it('vuelve a la caja 1 al fallar', () => {
    expect(nextBox(3, false)).toBe(1);
  });

  it('prioriza libros nuevos o poco dominados', () => {
    const books = [book('a'), book('b'), book('c')];
    const result = pickCards(books, { a: card(3), b: card(1) }, 2, () => 0.5);
    expect(result.map((b) => b.id)).toEqual(['c', 'b']);
  });
});