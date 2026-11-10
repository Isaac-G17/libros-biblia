import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-boton-volver',
  imports: [RouterLink],
  templateUrl: './boton-volver.component.html',
  styleUrl: './boton-volver.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotonVolverComponent {
  readonly ruta = input.required<string | readonly string[]>();
  readonly etiqueta = input('Volver');
}