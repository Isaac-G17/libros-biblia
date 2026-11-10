import { Book, Division } from '../models/book.model';
import { PracticeContext, buildQuestion } from './practice';

const book = (order: number, id: string, divisionId: string, author: string): Book => ({
  id, order, name: id.toUpperCase(), testament: order < 5 ? 'AT' : 'NT',
  divisionId, author, chapters: 1, theme: `tema ${id}`,
});
const division = (id: string, testament: 'AT' | 'NT'): Division => ({ id, name: id, testament, description: '' });

const books = [
  book(1, 'a', 'd1', 'W'), book(2, 'b', 'd1', 'X'), book(3, 'c', 'd2', 'Y'),
  book(4, 'd', 'd3', 'Z'), book(5, 'e', 'd4', 'V'),
];
const divisions = [division('d1', 'AT'), division('d2', 'AT'), division('d3', 'AT'), division('d4', 'NT')];
const context = (seen: string[], adult: boolean): PracticeContext => ({
  books, divisions, seenIds: new Set(seen), adult,
});

describe('buildQuestion', () => {
  it('siempre incluye la respuesta correcta, sin opciones repetidas', () => {
    for (let i = 0; i < 100; i++) {
      for (const b of books) {
        const q = buildQuestion(b, context(['a', 'b', 'c'], true));
        const ids = q.choices.map((c) => c.id);
        expect(ids).toContain(q.correctId);
        expect(new Set(ids).size).toBe(ids.length);
        expect(new Set(q.choices.map((c) => c.label)).size).toBe(ids.length);
      }
    }
  });

  it('no pregunta por el libro siguiente si aún no se ha visto', () => {
    for (let i = 0; i < 100; i++) {
      expect(buildQuestion(books[0], context(['a'], false)).kind).not.toBe('next');
    }
  });

  it('en modo niños no pregunta por autor ni tema', () => {
    for (let i = 0; i < 100; i++) {
      const kind = buildQuestion(books[0], context(['a', 'b'], false)).kind;
      expect(['author', 'theme']).not.toContain(kind);
    }
  });
});