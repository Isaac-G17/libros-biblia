import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Book, Canon, Division } from '../../models/book.model';

export type LoadStatus = 'loading' | 'ready' | 'error';

const DEFAULT_CANON = 'canon-66';
const DEFAULT_LANGUAGE = 'es';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly canon = signal<Canon | null>(null);
  private readonly _status = signal<LoadStatus>('loading');

  readonly status = this._status.asReadonly();
  readonly books = computed<readonly Book[]>(() => this.canon()?.books ?? []);
  readonly divisions = computed<readonly Division[]>(() => this.canon()?.divisions ?? []);

  private readonly divisionsById = computed(
    () => new Map<string, Division>(this.divisions().map((d) => [d.id, d])),
  );

  /** También sirve para reintentar tras un error. */
  async load(canonId = DEFAULT_CANON, language = DEFAULT_LANGUAGE): Promise<void> {
    this._status.set('loading');
    try {
      const canon = await firstValueFrom(this.http.get<Canon>(`data/${canonId}.${language}.json`));
      this.canon.set(canon);
      this._status.set('ready');
    } catch {
      this._status.set('error');
    }
  }

  division(divisionId: string): Division | undefined {
    return this.divisionsById().get(divisionId);
  }

  divisionName(divisionId: string): string {
    return this.division(divisionId)?.name ?? '';
  }
}