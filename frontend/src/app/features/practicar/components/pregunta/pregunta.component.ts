import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Question } from '../../../../core/utils/practice';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-pregunta',
  imports: [TarjetaComponent],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntaComponent {
  readonly pregunta = input.required<Question>();
  readonly seleccionadaId = input<string | null>(null);
  readonly elegir = output<string>();

  protected readonly respondida = computed(() => this.seleccionadaId() !== null);
  protected readonly acerto = computed(() => this.seleccionadaId() === this.pregunta().correctId);
}