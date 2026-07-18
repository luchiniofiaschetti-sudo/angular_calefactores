import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Observable } from 'rxjs';

import { CarritoService } from '../../service/carrito.service.js'; 
import { Calefactor } from '../../interfaces/calefactor.js';   
import { InputIntegerComponent } from '../input-integer.component/input-integer.component.js'; 

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, InputIntegerComponent],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  public carritoService = inject(CarritoService);

  public carrito$: Observable<Calefactor[]> = this.carritoService.items$;

  public calcularTotal(items: Calefactor[]): number {
    return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  public calcularCantidadTotal(items: Calefactor[]): number {
    return items.reduce((acc, item) => acc + item.cantidad, 0);
  }
  
  public confirmarCompra(): void {
    alert('Compra confirmada!');
  }
}
