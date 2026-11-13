import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';
import { AppMode } from '../../../../models/progress.model';
import { BotonComponent } from '../../../../shared/components/boton/boton.component';

@Component({
  selector: 'app-bienvenida-page',
  imports: [BotonComponent],
  templateUrl: './bienvenida-page.component.html',
  styleUrl: './bienvenida-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BienvenidaPageComponent {
  private readonly progress = inject(ProgressService);
  private readonly router = inject(Router);

  protected readonly paso = signal<1 | 2>(1);

  protected elegirModo(modo: AppMode): void {
    this.progress.setMode(modo);
    void this.router.navigateByUrl('/');
  }

  /** Omitir entra en modo adultos; el modo se cambia siempre desde la cabecera. */
  protected omitir(): void {
    this.elegirModo('adult');
  }
}