import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-insignia-division',
  templateUrl: './insignia-division.component.html',
  styleUrl: './insignia-division.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsigniaDivisionComponent {
  readonly divisionId = input.required<string>();
  readonly nombre = input.required<string>();

  protected readonly color = computed(() => `var(--cat-${this.divisionId()}, var(--color-primario))`);
}