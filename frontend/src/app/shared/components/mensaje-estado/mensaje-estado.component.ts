import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { BotonComponent } from '../boton/boton.component';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

export type TipoEstado = 'vacio' | 'error' | 'exito';

const ICONOS: Readonly<Record<TipoEstado, string>> = { vacio: '📭', error: '⚠️', exito: '🎉' };

@Component({
  selector: 'app-mensaje-estado',
  imports: [TarjetaComponent, BotonComponent],
  templateUrl: './mensaje-estado.component.html',
  styleUrl: './mensaje-estado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensajeEstadoComponent {
  readonly tipo = input<TipoEstado>('vacio');
  readonly titulo = input.required<string>();
  readonly mensaje = input('');
  readonly accionTexto = input('');
  readonly accion = output<void>();

  protected readonly icono = computed(() => ICONOS[this.tipo()]);
}