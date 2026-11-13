import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-ficha-pareja',
  templateUrl: './ficha-pareja.component.html',
  styleUrl: './ficha-pareja.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichaParejaComponent {
  readonly texto = input.required<string>();
  readonly seleccionada = input(false);
  readonly enError = input(false);
  readonly elegir = output<void>();
}