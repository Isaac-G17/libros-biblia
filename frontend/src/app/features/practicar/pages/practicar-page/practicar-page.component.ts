import { ChangeDetectionStrategy, Component, computed, effect, inject, input, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { BarraProgresoComponent } from '../../../../shared/components/barra-progreso/barra-progreso.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { ResultadoJuegoComponent } from '../../../../shared/components/resultado-juego/resultado-juego.component';
import { PreguntaComponent } from '../../components/pregunta/pregunta.component';
import { PracticeSessionService } from '../../services/practice-session.service';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';

@Component({
  selector: 'app-practicar-page',
  imports: [
    RouterLink, BotonComponent, BarraProgresoComponent, EsqueletoComponent,
    MensajeEstadoComponent, ResultadoJuegoComponent, PreguntaComponent, BotonVolverComponent,
  ],
  providers: [PracticeSessionService],
  templateUrl: './practicar-page.component.html',
  styleUrl: './practicar-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PracticarPageComponent {
  /** Filtro opcional desde `/practicar?division=pentateuco`. */
  readonly division = input<string>();

  protected readonly catalogo = inject(BooksService);
  protected readonly sesion = inject(PracticeSessionService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');
  protected readonly nombreDivision = computed(() => this.catalogo.divisionName(this.division() ?? ''));

  constructor() {
    // Arranca cuando el catálogo está listo y cada vez que cambia el filtro (no con cada cambio de progreso).
    effect(() => {
      const division = this.division();
      if (this.catalogo.status() === 'ready') untracked(() => this.sesion.start(division));
    });
  }
}