import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrl: './barra-progreso.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarraProgresoComponent {
  readonly valor = input.required<number>();
  readonly maximo = input.required<number>();
  readonly etiqueta = input.required<string>();

  protected readonly porcentaje = computed(() =>
    this.maximo() > 0 ? Math.min(100, Math.round((this.valor() / this.maximo()) * 100)) : 0,
  );
}