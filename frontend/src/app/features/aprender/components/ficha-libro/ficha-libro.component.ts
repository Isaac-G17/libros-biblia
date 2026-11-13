import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book, TESTAMENT_LABEL } from '../../../../models/book.model';
import { InsigniaDivisionComponent } from '../../../../shared/components/insignia-division/insignia-division.component';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

@Component({
  selector: 'app-ficha-libro',
  imports: [TarjetaComponent, InsigniaDivisionComponent],
  templateUrl: './ficha-libro.component.html',
  styleUrl: './ficha-libro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichaLibroComponent {
  readonly libro = input.required<Book>();
  readonly totalLibros = input.required<number>();
  readonly nombreDivision = input.required<string>();
  readonly esNinos = input(false);

  protected readonly etiquetaTestamento = TESTAMENT_LABEL;
}