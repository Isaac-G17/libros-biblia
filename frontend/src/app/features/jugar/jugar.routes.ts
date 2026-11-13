import { Routes } from '@angular/router';

export const JUGAR_ROUTES: Routes = [
  {
    path: '',
    title: 'Jugar · Libros de la Biblia',
    loadComponent: () => import('./pages/jugar-page/jugar-page.component').then((m) => m.JugarPageComponent),
  },
];