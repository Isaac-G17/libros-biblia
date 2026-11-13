import { Book, Division } from '../../models/book.model';
import { buildPairs } from './matching';

const book = (id: string, divisionId: string, theme: string): Book => ({
  id, order: 1, name: id.toUpperCase(), testament: 'AT', divisionId, author: '-', chapters: 1, theme,
});
const division = (id: string): Division => ({ id, name: id, testament: 'AT', description: '' });

describe('buildPairs', () => {
  it('en niños, cada pareja usa una división distinta (sin textos repetidos a la derecha)', () => {
    const books = [book('a', 'd1', 't1'), book('b', 'd1', 't2'), book('c', 'd2', 't3'), book('d', 'd3', 't4')];
    const divisions = [division('d1'), division('d2'), division('d3')];

    const pairs = buildPairs(books, divisions, true, 3);
    expect(new Set(pairs.map((p) => p.right)).size).toBe(pairs.length);
    expect(pairs.length).toBeLessThanOrEqual(3);
  });

  it('en adultos usa el tema de cada libro, sin restricción de división', () => {
    const books = [book('a', 'd1', 'tema a'), book('b', 'd1', 'tema b')];
    const pairs = buildPairs(books, [division('d1')], false, 2);
    expect(pairs.map((p) => p.right).sort()).toEqual(['tema a', 'tema b']);
  });

  it('nunca devuelve más parejas que libros disponibles', () => {
    const books = [book('a', 'd1', 't1')];
    expect(buildPairs(books, [division('d1')], false, 5)).toHaveLength(1);
  });
});