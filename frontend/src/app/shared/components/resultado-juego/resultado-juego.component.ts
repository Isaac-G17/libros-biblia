import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BotonComponent } from '../boton/boton.component';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

@Component({
  selector: 'app-resultado-juego',
  imports: [TarjetaComponent, BotonComponent],
  templateUrl: './resultado-juego.component.html',
  styleUrl: './resultado-juego.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultadoJuegoComponent {
  readonly aciertos = input.required<number>();
  readonly total = input.required<number>();
  readonly esNinos = input(false);
  readonly repetir = output<void>();

  protected readonly posiciones = [1, 2, 3] as const;
  private readonly proporcion = computed(() => (this.total() > 0 ? this.aciertos() / this.total() : 0));
  protected readonly porcentaje = computed(() => Math.round(this.proporcion() * 100));
  /** Mínimo una estrella: nunca se castiga. */
  protected readonly estrellas = computed(() =>
    this.proporcion() >= 0.9 ? 3 : this.proporcion() >= 0.6 ? 2 : 1,
  );
  protected readonly titulo = computed(() => {
    if (!this.esNinos()) return 'Ronda completa';
    return ['', '¡Buen intento, sigue así!', '¡Muy bien!', '¡Fantástico!'][this.estrellas()];
  });
}