import { Routes } from '@angular/router';

export const PRACTICAR_ROUTES: Routes = [
  {
    path: '',
    title: 'Practicar · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/practicar-page/practicar-page.component').then((m) => m.PracticarPageComponent),
  },
];