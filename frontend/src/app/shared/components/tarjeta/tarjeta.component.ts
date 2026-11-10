import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'app-tarjeta, a[app-tarjeta]',
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.interactiva]': 'interactiva()' },
})
export class TarjetaComponent {
  readonly interactiva = input(false, { transform: booleanAttribute });
}