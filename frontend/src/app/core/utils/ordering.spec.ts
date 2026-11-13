import { Book } from '../../models/book.model';
import { pickOrderingWindow, sortByOrder } from './ordering';

const book = (order: number, id: string): Book => ({
  id, order, name: id.toUpperCase(), testament: 'AT', divisionId: 'd', author: '-', chapters: 1, theme: '-',
});

describe('ordering', () => {
  it('ordena los libros por su número canónico', () => {
    const shuffled = [book(3, 'c'), book(1, 'a'), book(2, 'b')];
    expect(sortByOrder(shuffled).map((b) => b.id)).toEqual(['a', 'b', 'c']);
  });

  it('devuelve todos los libros si no superan el máximo', () => {
    const books = [book(1, 'a'), book(2, 'b')];
    expect(pickOrderingWindow(books, 5)).toEqual(books);
  });

  it('toma un tramo contiguo del tamaño máximo cuando hay más libros', () => {
    const books = [1, 2, 3, 4, 5, 6].map((n) => book(n, `b${n}`));
    const window = pickOrderingWindow(books, 3, () => 0.5); // arranca en índice 2
    expect(window.map((b) => b.id)).toEqual(['b3', 'b4', 'b5']);
  });
});