import { Routes } from '@angular/router';

export const ORDENAR_ROUTES: Routes = [
  {
    path: '',
    title: 'Ordenar · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/lista-ordenar-page/lista-ordenar-page.component').then((m) => m.ListaOrdenarPageComponent),
  },
  {
    path: ':divisionId',
    title: 'Ordenar · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/ordenar-page/ordenar-page.component').then((m) => m.OrdenarPageComponent),
  },
];