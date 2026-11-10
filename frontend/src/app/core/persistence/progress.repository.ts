import { ProgressState } from '../../models/progress.model';

/**
 * Puerto de persistencia. Los componentes nunca lo usan directamente:
 * pasan por ProgressService. En la Fase 2 se registra una implementación HTTP.
 */
export abstract class ProgressRepository {
  abstract load(): Promise<ProgressState>;
  abstract save(state: ProgressState): Promise<void>;
}