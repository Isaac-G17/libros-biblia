import { Routes } from '@angular/router';

export const APRENDER_ROUTES: Routes = [
  {
    path: '',
    title: 'Aprender · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/lista-divisiones-page/lista-divisiones-page.component').then(
        (m) => m.ListaDivisionesPageComponent,
      ),
  },
  {
    path: ':divisionId',
    title: 'Aprender · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/division-page/division-page.component').then((m) => m.DivisionPageComponent),
  },
];