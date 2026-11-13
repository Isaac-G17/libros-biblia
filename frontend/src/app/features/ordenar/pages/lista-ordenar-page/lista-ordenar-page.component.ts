import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { LearningPathService } from '../../../../core/services/learning-path.service';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { TarjetaDivisionOrdenarComponent } from '../../components/tarjeta-division-ordenar/tarjeta-division-ordenar.component';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';

@Component({
  selector: 'app-lista-ordenar-page',
  imports: [RouterLink, BotonComponent, EsqueletoComponent, MensajeEstadoComponent, TarjetaDivisionOrdenarComponent, BotonVolverComponent],
  templateUrl: './lista-ordenar-page.component.html',
  styleUrl: './lista-ordenar-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaOrdenarPageComponent {
  protected readonly catalogo = inject(BooksService);
  protected readonly recorrido = inject(LearningPathService);

  protected readonly hayDesbloqueadas = computed(() => this.recorrido.divisions().some((d) => d.seen >= 3));
}