import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-integer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-integer.component.html',
  styleUrls: ['./input-integer.component.css']
})
export class InputIntegerComponent {
  @Input() cantidad: number = 0;   // cantidad seleccionada
  @Input() maximo: number = 0;     // stock máximo
  @Output() cantidadChange = new EventEmitter<number>();
  @Output() maximoAlcanzado = new EventEmitter<string>();
  
  public sumarCantidad() {
    if (this.cantidad < this.maximo) {
      this.cantidad++;
      this.cantidadChange.emit(this.cantidad);
    } else {
      this.maximoAlcanzado.emit('Se alcanzó el stock máximo');
    }
  }

  public restarCantidad() {
    if (this.cantidad > 0) {
      this.cantidad--;
      this.cantidadChange.emit(this.cantidad);
    }
  }

  // Nuevo método para validar si el usuario escribe el número a mano
  public onChangeInput(valor: number) {
    // Si escribe un número mayor al stock, lo forzamos al máximo
    if (valor > this.maximo) {
      this.cantidad = this.maximo;
      this.maximoAlcanzado.emit('Se alcanzó el stock máximo');
    } 
    // Si escribe un número menor a cero, lo forzamos a cero
    else if (valor < 0 || !valor) {
      this.cantidad = 0;
    } 
    // Si el número está bien, lo asignamos directamente
    else {
      this.cantidad = valor;
    }

    // Notificamos al componente padre el valor corregido y validado
    this.cantidadChange.emit(this.cantidad);
  }
}
