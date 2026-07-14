import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calefactor } from '../interfaces/calefactor.js';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  // Estado interno del carrito
  private items: Calefactor[] = [];

  // Subject que mantiene y emite el estado
  private itemsSubject = new BehaviorSubject<Calefactor[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  // Agregar calefactor al carrito
  public agregar(calefactor: Calefactor, cantidad: number = 1): void {
    let index = -1; // valor por defecto si no se encuentra

    for (let i = 0; i < this.items.length; i++) {
      const c = this.items[i]; // calefactor actual
        if (c.id_calefactor === calefactor.id_calefactor) {
          index = i; // guardo el índice encontrado
          break;     // corto el bucle en la primera coincidencia
        }
    }

    if (index === -1) {
      // Si no existe, lo agregamos con la cantidad inicial
      this.items.push({ ...calefactor, cantidad });
    } else {
      // Si ya existe, incrementamos la cantidad
      this.items[index].cantidad += cantidad;
    }
    // Emitimos el nuevo estado
    this.itemsSubject.next([...this.items]);
  }

  // Quitar calefactor (restando cantidad o eliminando si llega a 0)
  public quitar(id_calefactor: number, cantidad: number = 1): void {
    const index = this.items.findIndex(c => c.id_calefactor === id_calefactor);

    if (index !== -1) {  // devuelve posicion primer item / -1 no existe
      this.items[index].cantidad -= cantidad;

      if (this.items[index].cantidad <= 0) {
        this.items.splice(index, 1); 
      }
      // Emitimos el nuevo estado
      this.itemsSubject.next([...this.items]);
    }
  }

  // Vaciar carrito completo
  public vaciar(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  // Calcular el total del carrito
  public getTotal(): number {
    let total = 0;
    for (const c of this.items) {
      total += c.precio * c.cantidad;
    }
    return total;
  }
  
  // Cantidad total de ítems en el carrito
  public getCantidadItems(): number {
    let cantidadTotal = 0;
    for (let i = 0; i < this.items.length; i++) {
      const c = this.items[i];
      cantidadTotal = cantidadTotal + c.cantidad;
    }
    return cantidadTotal;
  }  // reduce this.items.reduce((acc, c) => acc + c.cantidad, 0);
}
