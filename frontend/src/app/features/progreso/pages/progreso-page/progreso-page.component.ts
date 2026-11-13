import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { LearningPathService } from '../../../../core/services/learning-path.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { BarraProgresoComponent } from '../../../../shared/components/barra-progreso/barra-progreso.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { InsigniaDivisionComponent } from '../../../../shared/components/insignia-division/insignia-division.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-progreso-page',
  imports: [
    RouterLink, BotonComponent, TarjetaComponent, BarraProgresoComponent,
    InsigniaDivisionComponent, EsqueletoComponent, MensajeEstadoComponent,
  ],
  templateUrl: './progreso-page.component.html',
  styleUrl: './progreso-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgresoPageComponent {
  protected readonly catalogo = inject(BooksService);
  protected readonly recorrido = inject(LearningPathService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');
}