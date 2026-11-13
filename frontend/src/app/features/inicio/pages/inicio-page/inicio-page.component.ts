import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { LearningPathService } from '../../../../core/services/learning-path.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { BarraProgresoComponent } from '../../../../shared/components/barra-progreso/barra-progreso.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

interface PasoInicio {
  readonly etiqueta: string;
  readonly ruta: readonly string[];
}

@Component({
  selector: 'app-inicio-page',
  imports: [RouterLink, BotonComponent, TarjetaComponent, BarraProgresoComponent, MensajeEstadoComponent, EsqueletoComponent],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioPageComponent {
  protected readonly catalogo = inject(BooksService);
  protected readonly recorrido = inject(LearningPathService);
  private readonly progress = inject(ProgressService);

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');

  protected readonly titulo = computed(() => {
    const empezo = this.recorrido.seenCount() > 0;
    if (this.esNinos()) return empezo ? '¡Qué bueno verte otra vez!' : '¡Hola! Vamos a conocer los libros de la Biblia';
    return empezo ? 'Continúa donde te quedaste' : 'Aprende los libros de la Biblia';
  });

  /** La única acción principal de la pantalla. */
  protected readonly paso = computed<PasoInicio | null>(() => {
    const next = this.recorrido.nextStep();
    if (!next) return null;
    if (next.kind === 'practice') return { etiqueta: 'Practicar lo aprendido', ruta: ['/practicar'] };

    const prefijo = next.kind === 'start' ? 'Empezar' : 'Continuar';
    return { etiqueta: `${prefijo}: ${next.division.name}`, ruta: ['/aprender', next.division.id] };
  });
}