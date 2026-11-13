import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BooksService } from '../../../../core/services/books.service';
import { LearningPathService } from '../../../../core/services/learning-path.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { TESTAMENT_LABEL, Testament } from '../../../../models/book.model';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { TarjetaDivisionComponent } from '../../components/tarjeta-division/tarjeta-division.component';

const TESTAMENTOS: readonly Testament[] = ['AT', 'NT'];

@Component({
  selector: 'app-lista-divisiones-page',
  imports: [TarjetaDivisionComponent, EsqueletoComponent, MensajeEstadoComponent],
  templateUrl: './lista-divisiones-page.component.html',
  styleUrl: './lista-divisiones-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDivisionesPageComponent {
  protected readonly catalogo = inject(BooksService);
  private readonly recorrido = inject(LearningPathService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');
  protected readonly grupos = computed(() =>
    TESTAMENTOS.map((testamento) => ({
      etiqueta: TESTAMENT_LABEL[testamento],
      items: this.recorrido.divisions().filter((d) => d.division.testament === testamento),
    })),
  );
}