import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnectivityService } from './core/services/connectivity.service';
import { ProgressService } from './core/services/progress.service';
import { DestinoNavegacion } from './models/navegacion.model';
import { BarraNavegacionComponent } from './shared/components/barra-navegacion/barra-navegacion.component';
import { ConmutadorModoComponent } from './shared/components/conmutador-modo/conmutador-modo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ConmutadorModoComponent, BarraNavegacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly progress = inject(ProgressService);
  protected readonly conectividad = inject(ConnectivityService);

  protected readonly destinos: readonly DestinoNavegacion[] = [
    { ruta: '/', etiqueta: 'Inicio', icono: '🏠', exacto: true },
    { ruta: '/aprender', etiqueta: 'Aprender', icono: '📚' },
    { ruta: '/jugar', etiqueta: 'Jugar', icono: '🎮' },
    { ruta: '/progreso', etiqueta: 'Progreso', icono: '⭐' },
  ];
}