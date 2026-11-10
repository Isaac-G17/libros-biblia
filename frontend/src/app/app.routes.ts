import { Routes } from '@angular/router';
import { modeGuard } from './core/guards/mode.guard';

export const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./features/bienvenida/bienvenida.routes').then((m) => m.BIENVENIDA_ROUTES),
  },
  {
    path: '',
    canActivate: [modeGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/inicio/inicio.routes').then((m) => m.INICIO_ROUTES),
      },
      {
        path: 'aprender',
        loadChildren: () => import('./features/aprender/aprender.routes').then((m) => m.APRENDER_ROUTES),
      },
      {
        path: 'practicar',
        loadChildren: () => import('./features/practicar/practicar.routes').then((m) => m.PRACTICAR_ROUTES),
      },
      {
        path: 'progreso',
        loadChildren: () => import('./features/progreso/progreso.routes').then((m) => m.PROGRESO_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];