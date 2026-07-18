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
  @Input() cantidad: number = 0;  
  @Input() maximo: number = 0;     
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

  public onChangeInput(valor: number) {
    if (valor > this.maximo) {
      this.cantidad = this.maximo;
      this.maximoAlcanzado.emit('Se alcanzó el stock máximo');
    } 
    else if (valor < 0 || !valor) {
      this.cantidad = 0;
    } 
    else {
      this.cantidad = valor;
    }
    this.cantidadChange.emit(this.cantidad);
  }
}
