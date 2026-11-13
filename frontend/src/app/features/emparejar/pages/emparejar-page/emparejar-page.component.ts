import { ChangeDetectionStrategy, Component, computed, effect, inject, input, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { ResultadoJuegoComponent } from '../../../../shared/components/resultado-juego/resultado-juego.component';
import { FichaParejaComponent } from '../../components/ficha-pareja/ficha-pareja.component';
import { MatchingSessionService } from '../../services/matching-session.service';

@Component({
  selector: 'app-emparejar-page',
  imports: [
    RouterLink, BotonComponent, BotonVolverComponent, EsqueletoComponent,
    MensajeEstadoComponent, ResultadoJuegoComponent, FichaParejaComponent,
  ],
  providers: [MatchingSessionService],
  templateUrl: './emparejar-page.component.html',
  styleUrl: './emparejar-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmparejarPageComponent {
  /** Filtro opcional desde `/emparejar?division=pentateuco`. */
  readonly division = input<string>();

  protected readonly catalogo = inject(BooksService);
  protected readonly sesion = inject(MatchingSessionService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');

  constructor() {
    effect(() => {
      const division = this.division();
      if (this.catalogo.status() === 'ready') untracked(() => this.sesion.start(division));
    });
  }
}