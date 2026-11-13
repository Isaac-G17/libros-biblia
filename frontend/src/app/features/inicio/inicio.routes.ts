import { Routes } from '@angular/router';

export const INICIO_ROUTES: Routes = [
  {
    path: '',
    title: 'Inicio · Libros de la Biblia',
    loadComponent: () =>
      import('./pages/inicio-page/inicio-page.component').then((m) => m.InicioPageComponent),
  },
];