import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';

/** Sin modo elegido, la persona pasa primero por la bienvenida. */
export const modeGuard: CanActivateFn = () =>
  inject(ProgressService).mode() ? true : inject(Router).createUrlTree(['/bienvenida']);