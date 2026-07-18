import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Calefactor } from '../interfaces/calefactor.js';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: Calefactor[] = [];

  private itemsSubject = new BehaviorSubject<Calefactor[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  public getCantidadEnCarrito(id_calefactor: number): number {
    const item = this.items.find(c => c.id_calefactor === id_calefactor);
    return item ? item.cantidad : 0;
  }

  public agregar(calefactor: Calefactor, cantidad: number = 1): void {
    let index = -1; 

    for (let i = 0; i < this.items.length; i++) {
      const c = this.items[i]; 
      if (c.id_calefactor === calefactor.id_calefactor) {
        index = i; 
        break;  
      }
    }

    const cantidadActual = index !== -1 ? this.items[index].cantidad : 0;

    if (cantidadActual + cantidad > calefactor.stock) {
      alert(`No puedes agregar más unidades. Stock máximo: ${calefactor.stock}`);
      return;
    }

    if (index === -1) {
      this.items.push({ ...calefactor, cantidad });
    } else {
      this.items[index].cantidad += cantidad;
    }
    this.itemsSubject.next([...this.items]);
  }

  public quitar(id_calefactor: number, cantidad: number = 1): void {
    const index = this.items.findIndex(c => c.id_calefactor === id_calefactor);

    if (index !== -1) {  
      this.items[index].cantidad -= cantidad;

      if (this.items[index].cantidad <= 0) {
        this.items.splice(index, 1); 
      }
      this.itemsSubject.next([...this.items]);
    }
  }

  public vaciar(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  public getTotal(): number {
    let total = 0;
    for (const c of this.items) {
      total += c.precio * c.cantidad;
    }
    return total;
  }
  
  public getCantidadItems(): number {
    let cantidadTotal = 0;
    for (let i = 0; i < this.items.length; i++) {
      const c = this.items[i];
      cantidadTotal = cantidadTotal + c.cantidad;
    }
    return cantidadTotal;
  }  
}
