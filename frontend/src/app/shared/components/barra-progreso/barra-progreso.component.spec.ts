import { TestBed } from '@angular/core/testing';
import { BarraProgresoComponent } from './barra-progreso.component';

describe('BarraProgresoComponent', () => {
  function crear(valor: number, maximo: number) {
    const fixture = TestBed.createComponent(BarraProgresoComponent);
    fixture.componentRef.setInput('valor', valor);
    fixture.componentRef.setInput('maximo', maximo);
    fixture.componentRef.setInput('etiqueta', 'Libros vistos');
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('expone el avance a lectores de pantalla y calcula el ancho', () => {
    const el = crear(3, 12);
    const pista = el.querySelector('[role="progressbar"]')!;
    expect(pista.getAttribute('aria-valuenow')).toBe('3');
    expect(pista.getAttribute('aria-valuetext')).toBe('3 de 12');
    expect((el.querySelector('.relleno') as HTMLElement).style.width).toBe('25%');
  });

  it('no divide por cero ni pasa de 100%', () => {
    expect((crear(5, 0).querySelector('.relleno') as HTMLElement).style.width).toBe('0%');
    expect((crear(9, 3).querySelector('.relleno') as HTMLElement).style.width).toBe('100%');
  });
});