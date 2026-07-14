import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from '../../service/modelo.service.js';
import { Observable } from 'rxjs';
import { Modelo } from '../../interfaces/modelos.js';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent {
  private fb = inject(FormBuilder);
  private modeloService = inject(ModeloService);

  // Formularios reactivos
  public formAgregar: FormGroup;
  public formModificar: FormGroup;

  // Observable para mostrar lista de modelos en tiempo real
  public modelos$!: Observable<Modelo[]>;

  constructor() {
    this.formAgregar = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['']
    });

    this.formModificar = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['']
    });

    // Cargamos modelos existentes para referencia
    this.modelos$ = this.modeloService.getModelos();
  }

  public onAgregar(): void {
    if (this.formAgregar.invalid) return;
    const nuevoModelo = this.formAgregar.value;

    this.modeloService.agregarModelo(nuevoModelo).subscribe({
      next: () => {
        alert('Modelo agregado correctamente');
        this.formAgregar.reset(); // 1. Limpia los casilleros del formulario de alta
        this.modelos$ = this.modeloService.getModelos(); // 2. Refresca la lista en tiempo real
      },
      // 3. Agregamos el tipado estricto ': any' para el compilador
      error: (err: any) => console.error('Error al agregar modelo:', err)
    });
  }

  public onModificar(): void {
    if (this.formModificar.invalid) return;
    const { id, ...modeloActualizado } = this.formModificar.value;

    this.modeloService.modificarModelo(id, modeloActualizado).subscribe({
      next: () => {
        alert('Modelo modificado correctamente');
        this.formModificar.reset(); // 1. Limpia los casilleros del formulario de modificación
        this.modelos$ = this.modeloService.getModelos(); // 2. Refresca la lista en tiempo real
      },
      // 3. Agregamos el tipado estricto ': any' para el compilador
      error: (err: any) => console.error('Error al modificar modelo:', err)
    });
  }
}