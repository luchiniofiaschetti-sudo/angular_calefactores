import { CommonModule } from "@angular/common";
import { ModeloService } from "../../service/modelo.service.js";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Modelo } from "../../interfaces/modelos.js";
import { Component, OnInit } from "@angular/core";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  modelos$!: Observable<Modelo[]>;

  constructor(
    private modeloService: ModeloService, 
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.modelos$ = this.route.queryParams.pipe(
      switchMap(params => {
        const campo = params['campo'];
        const filtro = params['filtro'];

        if (campo && filtro) {
          return this.modeloService.getModelosFiltrados(campo, filtro);
        } else {
          return this.modeloService.getModelos();
        }
      })
    );
  }
}
