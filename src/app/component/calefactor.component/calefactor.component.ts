import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, catchError, of } from 'rxjs'; 
import { Calefactor } from '../../interfaces/calefactor.js';
import { CalefactorService } from '../../service/calefactor.service.js';
import { InputIntegerComponent } from '../input-integer.component/input-integer.component.js';
import { CarritoService } from '../../service/carrito.service.js';
import { CompraComponent } from '../compra.component/compra.component.js';

@Component({
  selector: 'app-calefactor',
  standalone: true,
  imports: [CommonModule, InputIntegerComponent, CompraComponent],
  templateUrl: './calefactor.component.html',
  styleUrls: ['./calefactor.component.css']
})
export class CalefactorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private calefactorService = inject(CalefactorService);
  public carritoService = inject(CarritoService);

  public id_modelo!: number;
  public calefactores$!: Observable<Calefactor[]>;

  ngOnInit(): void {
    this.calefactores$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.id_modelo = Number(params.get('id_modelo'));
        return this.calefactorService.getCalefactoresPorModelo(this.id_modelo).pipe(
          catchError(error => {
            console.warn('API respondió con error (ej. 404), devolviendo array vacío:', error);
            if (error.status === 404) {
              return of([]); // 'of([])' crea un observable con un array vacio de inmediato
            }
            // Si es otro tipo de error (como un 500 de servidor caido), lo dejamos pasar o relanzamos
            return of([]); 
          })

        );
      })
    );
  }

  public agregarCantidad(calefactor: Calefactor, nuevaCantidad: number) {
    this.carritoService.agregar(calefactor, nuevaCantidad);
  }

  public mostrarAviso(mensaje: string) {
    alert(mensaje);
  }
}
