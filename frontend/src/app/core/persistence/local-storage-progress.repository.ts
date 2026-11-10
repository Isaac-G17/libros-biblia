import { Injectable } from '@angular/core';
import { ProgressState, createEmptyState } from '../../models/progress.model';
import { ProgressRepository } from './progress.repository';

const STORAGE_KEY = 'libros-biblia:progress';

@Injectable()
export class LocalStorageProgressRepository extends ProgressRepository {
  async load(): Promise<ProgressState> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createEmptyState();
      const parsed = JSON.parse(raw) as Partial<ProgressState>;
      if (parsed.version !== 1) return createEmptyState();

      const empty = createEmptyState();
      // Se mezclan las preferencias para que datos guardados antes sigan siendo válidos.
      return {
        ...empty,
        ...parsed,
        preferences: { ...empty.preferences, ...parsed.preferences },
      };
    } catch {
      return createEmptyState(); // datos corruptos o almacenamiento bloqueado
    }
  }

  async save(state: ProgressState): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Modo privado o cuota llena: la app sigue funcionando en memoria.
    }
  }
}