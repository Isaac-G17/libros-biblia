import { Routes } from '@angular/router';

export const PROGRESO_ROUTES: Routes = [
  {
    path: '',
    title: 'Progreso · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/progreso-page/progreso-page.component').then((m) => m.ProgresoPageComponent),
  },
];