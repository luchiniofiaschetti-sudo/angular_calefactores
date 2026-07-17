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
      id_modelo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['']
    });

    // Cargamos modelos existentes para referencia
    this.modelos$ = this.modeloService.getModelos();
  }

  public seleccionarModelo(m: Modelo): void {
    this.formModificar.patchValue({
      id_modelo: m.id_modelo,
      nombre: m.nombre,
      descripcion: m.descripcion,
      categoria: m.categoria,
      imagen: m.imagen,
    })
  }

  public onAgregar(): void {
    if (this.formAgregar.invalid) {
      return;
    }
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
    if (this.formModificar.invalid) {
      return;
    }
  
    const modeloActualizado = {
      ...this.formModificar.value,
      id_modelo: Number(this.formModificar.value.id_modelo)
    };
  
    this.modeloService.modificarModelo(modeloActualizado.id_modelo, modeloActualizado).subscribe({
      next: () => {
        alert('Modelo modificado correctamente');
        this.formModificar.reset();
        this.modelos$ = this.modeloService.getModelos();
      },
      error: (err: any) => console.error('Error al modificar modelo:', err)
    });
  }

  public confirmarEliminar(m: Modelo): void {
    if (confirm(`¿Seguro que deseas eliminar el modelo "${m.nombre}"?`)) {
      this.eliminarModelo(m);
    }
  }
    
  public eliminarModelo(m: Modelo): void {
    
    if(!m.id_modelo) {
      alert('Error');
      return;   
    }

    this.modeloService.eliminarModelo(m.id_modelo).subscribe({
      next: () => {
        alert('Modelo eliminado con exito');
        this.modelos$ = this.modeloService.getModelos();
      },
      error: (err: any) => console.error('Error al eliminar el modelo: ', err)
    });
  }
}