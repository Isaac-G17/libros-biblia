import { ChangeDetectionStrategy, Component, computed, effect, inject, input, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { ResultadoJuegoComponent } from '../../../../shared/components/resultado-juego/resultado-juego.component';
import { OrderingSessionService } from '../../services/ordering-session.service';

@Component({
  selector: 'app-ordenar-page',
  imports: [RouterLink, BotonComponent, BotonVolverComponent, EsqueletoComponent, MensajeEstadoComponent, ResultadoJuegoComponent],
  providers: [OrderingSessionService],
  templateUrl: './ordenar-page.component.html',
  styleUrl: './ordenar-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdenarPageComponent {
  /** Llega desde la ruta `ordenar/:divisionId` (withComponentInputBinding). */
  readonly divisionId = input.required<string>();

  protected readonly catalogo = inject(BooksService);
  protected readonly sesion = inject(OrderingSessionService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');
  protected readonly division = computed(() => this.catalogo.division(this.divisionId()));
  protected readonly ordenCorrectoTexto = computed(() =>
    this.sesion.canonical().map((b) => b.name).join(' → '),
  );

  constructor() {
    effect(() => {
      const id = this.divisionId();
      if (this.catalogo.status() === 'ready') untracked(() => this.sesion.start(id));
    });
  }
}