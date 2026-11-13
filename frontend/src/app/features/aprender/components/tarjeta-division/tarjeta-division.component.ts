import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DivisionProgress } from '../../../../core/services/learning-path.service';
import { BarraProgresoComponent } from '../../../../shared/components/barra-progreso/barra-progreso.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-tarjeta-division',
  imports: [RouterLink, TarjetaComponent, BarraProgresoComponent],
  templateUrl: './tarjeta-division.component.html',
  styleUrl: './tarjeta-division.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaDivisionComponent {
  readonly progreso = input.required<DivisionProgress>();

  protected readonly color = computed(
    () => `var(--cat-${this.progreso().division.id}, var(--color-primario))`,
  );
  protected readonly completa = computed(
    () => this.progreso().total > 0 && this.progreso().seen === this.progreso().total,
  );
}