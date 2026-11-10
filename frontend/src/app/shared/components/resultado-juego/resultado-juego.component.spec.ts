import { TestBed } from '@angular/core/testing';
import { ResultadoJuegoComponent } from './resultado-juego.component';

describe('ResultadoJuegoComponent', () => {
  function crear(aciertos: number, total: number, esNinos: boolean) {
    const fixture = TestBed.createComponent(ResultadoJuegoComponent);
    fixture.componentRef.setInput('aciertos', aciertos);
    fixture.componentRef.setInput('total', total);
    fixture.componentRef.setInput('esNinos', esNinos);
    fixture.detectChanges();
    return fixture;
  }

  it('en modo niños nunca muestra menos de una estrella', () => {
    const el: HTMLElement = crear(0, 8, true).nativeElement;
    expect(el.querySelector('[role="img"]')!.getAttribute('aria-label')).toBe('1 de 3 estrellas');
  });

  it('en modo adultos muestra el porcentaje', () => {
    const el: HTMLElement = crear(7, 10, false).nativeElement;
    expect(el.textContent).toContain('70%');
  });

  it('emite "repetir" al pulsar Jugar de nuevo', () => {
    const fixture = crear(5, 10, false);
    let veces = 0;
    fixture.componentInstance.repetir.subscribe(() => veces++);
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    expect(veces).toBe(1);
  });
});