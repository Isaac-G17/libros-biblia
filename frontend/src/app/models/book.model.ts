export type Testament = 'AT' | 'NT';

export const TESTAMENT_LABEL: Readonly<Record<Testament, string>> = {
  AT: 'Antiguo Testamento',
  NT: 'Nuevo Testamento',
};

export interface Division {
  readonly id: string;
  readonly name: string;
  readonly testament: Testament;
  readonly description: string;
}

export interface Book {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly testament: Testament;
  readonly divisionId: string;
  readonly author: string;
  readonly chapters: number;
  readonly theme: string;
}

export interface Canon {
  readonly id: string;
  readonly name: string;
  readonly language: string;
  readonly divisions: readonly Division[];
  readonly books: readonly Book[];
}