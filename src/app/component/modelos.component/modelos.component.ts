import { CommonModule } from "@angular/common";
import { ModeloService } from "../../service/modelo.service.js";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Modelo } from "../../interfaces/modelos.js";
import { Component, OnInit } from "@angular/core";
import { Observable, switchMap } from "rxjs"; // <-- Agregamos switchMap y Observable

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  // Cambiamos el array por un Observable (notar el signo $)
  modelos$!: Observable<Modelo[]>;

  constructor(
    private modeloService: ModeloService, 
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    // Escuchamos los cambios de la URL y los transformamos directamente en la petición a la API
    this.modelos$ = this.route.queryParams.pipe(
      switchMap(params => {
        const campo = params['campo'];
        const filtro = params['filtro'];

        if (campo && filtro) {
          // Retornamos el observable de filtrados (sin .subscribe)
          return this.modeloService.getModelosFiltrados(campo, filtro);
        } else {
          // Retornamos el observable de todos (sin .subscribe)
          return this.modeloService.getModelos();
        }
      })
    );
  }
}

/*
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { ModeloService } from "../../service/modelo.service"; // <-- Quitamos .js
import { Modelo } from "../../interfaces/modelos";           // <-- Quitamos .js

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent {
  // Inyección de dependencias moderna (Angular 14+) sin necesidad de constructor
  private modeloService = inject(ModeloService);
  private route = inject(ActivatedRoute);

  // Enfoque Declarativo: Definimos el flujo directamente sin usar ngOnInit
  public modelos$: Observable<Modelo[]> = this.route.queryParams.pipe(
    switchMap(({ campo, filtro }) => {
      // Usamos destructuración para extraer las propiedades limpiamente
      if (campo && filtro) {
        return this.modeloService.getModelosFiltrados(campo, filtro);
      }
      return this.modeloService.getModelos();
    })
  );
}

*/ 