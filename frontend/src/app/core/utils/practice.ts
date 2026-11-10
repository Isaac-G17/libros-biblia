import { Book, Division, TESTAMENT_LABEL } from '../../models/book.model';

export type QuestionKind = 'testament' | 'division' | 'next' | 'author' | 'theme';

export interface Choice {
  readonly id: string;
  readonly label: string;
}

export interface Question {
  readonly bookId: string;
  readonly kind: QuestionKind;
  readonly prompt: string;
  readonly choices: readonly Choice[];
  readonly correctId: string;
  readonly explanation: string;
}

export interface PracticeContext {
  readonly books: readonly Book[]; // canon completo
  readonly divisions: readonly Division[];
  readonly seenIds: ReadonlySet<string>;
  readonly adult: boolean;
}

type Random = () => number;
type Builder = (book: Book, ctx: PracticeContext, random: Random) => Question | null;

const DISTRACTORS = 3;

export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function testamentQuestion(book: Book): Question {
  return {
    bookId: book.id,
    kind: 'testament',
    prompt: `¿A qué testamento pertenece ${book.name}?`,
    choices: [
      { id: 'AT', label: TESTAMENT_LABEL.AT },
      { id: 'NT', label: TESTAMENT_LABEL.NT },
    ],
    correctId: book.testament,
    explanation: `${book.name} está en el ${TESTAMENT_LABEL[book.testament]}.`,
  };
}

function divisionQuestion(book: Book, ctx: PracticeContext, random: Random): Question | null {
  const correct = ctx.divisions.find((d) => d.id === book.divisionId);
  if (!correct) return null;

  // Los distractores son del mismo testamento: así la pregunta enseña a distinguir grupos.
  const distractors = shuffle(
    ctx.divisions.filter((d) => d.testament === book.testament && d.id !== correct.id),
    random,
  ).slice(0, DISTRACTORS);
  if (distractors.length === 0) return null;

  return {
    bookId: book.id,
    kind: 'division',
    prompt: `¿En qué división está ${book.name}?`,
    choices: shuffle([correct, ...distractors], random).map((d) => ({ id: d.id, label: d.name })),
    correctId: correct.id,
    explanation: `${book.name} pertenece a: ${correct.name}.`,
  };
}

function nextQuestion(book: Book, ctx: PracticeContext, random: Random): Question | null {
  const next = ctx.books.find((b) => b.order === book.order + 1);
  if (!next || !ctx.seenIds.has(next.id)) return null; // no preguntar por libros no vistos

  const others = ctx.books.filter((b) => b.id !== next.id && b.id !== book.id);
  const distractors = [
    ...shuffle(others.filter((b) => ctx.seenIds.has(b.id)), random),
    ...shuffle(others.filter((b) => !ctx.seenIds.has(b.id)), random),
  ].slice(0, DISTRACTORS);

  return {
    bookId: book.id,
    kind: 'next',
    prompt: `¿Qué libro va después de ${book.name}?`,
    choices: shuffle([next, ...distractors], random).map((b) => ({ id: b.id, label: b.name })),
    correctId: next.id,
    explanation: `Después de ${book.name} va ${next.name}.`,
  };
}

function authorQuestion(book: Book, ctx: PracticeContext, random: Random): Question | null {
  const others = [...new Set(ctx.books.map((b) => b.author))].filter((a) => a !== book.author);
  if (others.length < DISTRACTORS) return null;

  const distractors = shuffle(others, random).slice(0, DISTRACTORS);
  return {
    bookId: book.id,
    kind: 'author',
    prompt: `¿Quién escribió ${book.name}?`,
    choices: shuffle([book.author, ...distractors], random).map((a) => ({ id: a, label: a })),
    correctId: book.author,
    explanation: `Autor de ${book.name}: ${book.author}.`,
  };
}

function themeQuestion(book: Book, ctx: PracticeContext, random: Random): Question | null {
  const distractors = shuffle(ctx.books.filter((b) => b.id !== book.id), random).slice(0, DISTRACTORS);
  if (distractors.length < DISTRACTORS) return null;

  return {
    bookId: book.id,
    kind: 'theme',
    prompt: `¿De qué trata ${book.name}?`,
    choices: shuffle([book, ...distractors], random).map((b) => ({ id: b.id, label: b.theme })),
    correctId: book.id,
    explanation: `${book.name}: ${book.theme}`,
  };
}

const KIDS_BUILDERS: readonly Builder[] = [testamentQuestion, divisionQuestion, nextQuestion];
const ADULT_BUILDERS: readonly Builder[] = [...KIDS_BUILDERS, authorQuestion, themeQuestion];

/** Elige al azar un tipo de pregunta aplicable; la de testamento siempre es posible. */
export function buildQuestion(book: Book, ctx: PracticeContext, random: Random = Math.random): Question {
  for (const build of shuffle(ctx.adult ? ADULT_BUILDERS : KIDS_BUILDERS, random)) {
    const question = build(book, ctx, random);
    if (question) return question;
  }
  return testamentQuestion(book);
}