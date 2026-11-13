import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { TESTAMENT_LABEL } from '../../../../models/book.model';
import { BarraProgresoComponent } from '../../../../shared/components/barra-progreso/barra-progreso.component';
import { BotonVolverComponent } from '../../../../shared/components/boton-volver/boton-volver.component';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';
import { EsqueletoComponent } from '../../../../shared/components/esqueleto/esqueleto.component';
import { MensajeEstadoComponent } from '../../../../shared/components/mensaje-estado/mensaje-estado.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';
import { FichaLibroComponent } from '../../components/ficha-libro/ficha-libro.component';

@Component({
  selector: 'app-division-page',
  imports: [
    RouterLink, BotonComponent, BotonVolverComponent, BarraProgresoComponent, TarjetaComponent,
    EsqueletoComponent, MensajeEstadoComponent, FichaLibroComponent,
  ],
  templateUrl: './division-page.component.html',
  styleUrl: './division-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionPageComponent {
  /** Llega desde la ruta `aprender/:divisionId` (withComponentInputBinding). */
  readonly divisionId = input.required<string>();

  protected readonly catalogo = inject(BooksService);
  private readonly progress = inject(ProgressService);
  protected readonly etiquetaTestamento = TESTAMENT_LABEL;

  protected readonly esNinos = computed(() => this.progress.mode() === 'kids');
  protected readonly division = computed(() => this.catalogo.division(this.divisionId()));
  protected readonly libros = computed(() =>
    this.catalogo.books().filter((b) => b.divisionId === this.divisionId()),
  );
  protected readonly total = computed(() => this.libros().length);
  protected readonly primerNumero = computed(() => this.libros()[0]?.order ?? 1);

  /** 0 = introducción, 1..n = un libro por paso, n+1 = final. Se reinicia al cambiar de división. */
  protected readonly paso = linkedSignal({ source: this.divisionId, computation: () => 0 });

  protected readonly libroActual = computed(() =>
    this.paso() > 0 ? this.libros()[this.paso() - 1] : undefined,
  );
  protected readonly terminado = computed(() => this.total() > 0 && this.paso() > this.total());
  protected readonly siguiente = computed(() => {
    const lista = this.catalogo.divisions();
    const i = lista.findIndex((d) => d.id === this.divisionId());
    return i >= 0 ? lista[i + 1] : undefined;
  });

  protected empezar(): void { this.paso.set(1); }
  protected repetir(): void { this.paso.set(0); }
  protected anterior(): void { this.paso.update((p) => Math.max(0, p - 1)); }

  protected avanzar(): void {
    const libro = this.libroActual();
    if (libro) this.progress.markSeen(libro.id);
    this.paso.update((p) => p + 1);
  }
}