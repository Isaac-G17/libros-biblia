import { Routes } from '@angular/router';

export const EMPAREJAR_ROUTES: Routes = [
  {
    path: '',
    title: 'Emparejar · Libros de la Biblia',
    loadComponent: () => import('./pages/emparejar-page/emparejar-page.component').then((m) => m.EmparejarPageComponent),
  },
];