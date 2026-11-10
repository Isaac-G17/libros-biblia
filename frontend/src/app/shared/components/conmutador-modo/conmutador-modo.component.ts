import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppMode } from '../../../models/progress.model';

@Component({
  selector: 'app-conmutador-modo',
  templateUrl: './conmutador-modo.component.html',
  styleUrl: './conmutador-modo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConmutadorModoComponent {
  readonly modo = input.required<AppMode>();
  readonly cambio = output<AppMode>();

  protected readonly opciones: readonly { valor: AppMode; etiqueta: string }[] = [
    { valor: 'kids', etiqueta: 'Niños' },
    { valor: 'adult', etiqueta: 'Adultos' },
  ];
}