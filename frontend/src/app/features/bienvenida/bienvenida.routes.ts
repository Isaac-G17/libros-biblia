import { Routes } from '@angular/router';

export const BIENVENIDA_ROUTES: Routes = [
  {
    path: '',
    title: 'Bienvenida · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/bienvenida-page/bienvenida-page.component').then((m) => m.BienvenidaPageComponent),
  },
];