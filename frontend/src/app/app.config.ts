import { ApplicationConfig, inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { LocalStorageProgressRepository } from './core/persistence/local-storage-progress.repository';
import { ProgressRepository } from './core/persistence/progress.repository';
import { BooksService } from './core/services/books.service';
import { ProgressService } from './core/services/progress.service';
import { ThemeService } from './core/services/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    // Fase 2: cambiar por HttpProgressRepository, sin tocar ningún componente.
    { provide: ProgressRepository, useClass: LocalStorageProgressRepository },
    provideAppInitializer(() => {
      inject(ThemeService); // se instancia para que aplique el tema
      void inject(BooksService).load(); // no bloquea: las páginas muestran un esqueleto
      return inject(ProgressService).init(); // el guard necesita el modo ya cargado
    }),
  ],
};
