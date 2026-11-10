import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { ProgressService } from './progress.service';

/** Aplica el tema (`modo-ninos` o `modo-adultos`) en <html> según el modo elegido. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {
    const root = inject(DOCUMENT).documentElement;
    const progress = inject(ProgressService);

    effect(() => {
      const kids = progress.mode() === 'kids';
      root.classList.toggle('modo-ninos', kids);
      root.classList.toggle('modo-adultos', !kids);
    });
  }
}