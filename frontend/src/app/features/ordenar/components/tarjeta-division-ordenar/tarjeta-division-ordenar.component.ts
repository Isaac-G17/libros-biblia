import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DivisionProgress } from '../../../../core/services/learning-path.service';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

const MINIMO = 3;

@Component({
  selector: 'app-tarjeta-division-ordenar',
  imports: [RouterLink, TarjetaComponent],
  templateUrl: './tarjeta-division-ordenar.component.html',
  styleUrl: './tarjeta-division-ordenar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaDivisionOrdenarComponent {
  readonly progreso = input.required<DivisionProgress>();

  protected readonly color = computed(() => `var(--cat-${this.progreso().division.id}, var(--color-primario))`);
  protected readonly habilitada = computed(() => this.progreso().seen >= MINIMO);
  protected readonly faltan = computed(() => MINIMO - this.progreso().seen);
}