import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'button[app-boton], a[app-boton]',
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.primario]': "variante() === 'primario'",
    '[class.bloque]': 'bloque()',
  },
})
export class BotonComponent {
  readonly variante = input<'primario' | 'secundario'>('secundario');
  readonly bloque = input(false, { transform: booleanAttribute });
}