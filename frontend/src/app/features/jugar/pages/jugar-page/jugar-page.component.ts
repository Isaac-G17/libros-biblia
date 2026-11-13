import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarjetaComponent } from '../../../../shared/components/tarjeta/tarjeta.component';

interface Actividad {
  readonly ruta: string;
  readonly icono: string;
  readonly titulo: string;
  readonly pista: string;
}

@Component({
  selector: 'app-jugar-page',
  imports: [RouterLink, TarjetaComponent],
  templateUrl: './jugar-page.component.html',
  styleUrl: './jugar-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JugarPageComponent {
  protected readonly actividades: readonly Actividad[] = [
    { ruta: '/practicar', icono: '✍️', titulo: 'Practicar', pista: 'Responde preguntas y mide lo que sabes' },
    { ruta: '/ordenar', icono: '🔢', titulo: 'Ordenar', pista: 'Pon los libros en el orden correcto' },
    { ruta: '/emparejar', icono: '🧩', titulo: 'Emparejar', pista: 'Une cada libro con su pareja' },
  ];
}