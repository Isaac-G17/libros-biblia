import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-esqueleto',
  templateUrl: './esqueleto.component.html',
  styleUrl: './esqueleto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EsqueletoComponent {
  readonly lineas = input(3);
  protected readonly items = computed(() => Array.from({ length: this.lineas() }, (_, i) => i));
}