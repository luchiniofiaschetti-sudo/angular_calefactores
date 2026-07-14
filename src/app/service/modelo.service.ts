import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../interfaces/modelos.js';

@Injectable({ providedIn: 'root' })
export class ModeloService {
  private apiUrl = 'http://localhost/api_calefactores/api/modelos';

  constructor(private http: HttpClient) {}

  // Traer todos los modelos
  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}`);
  }

  // Traer un modelo por ID
  public getModeloById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}/calefactores`);
  }

  public getCalefactoresDeModelo(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/calefactores`);
  }

  // Traer modelos filtrados por campo y valor
  public getModelosFiltrados(campo: string, filtro: string): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}?campo=${campo}&filtro=${filtro}`);
  }

    // En modelo.service.ts
  public agregarModelo(modelo: Modelo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, modelo);
  }

  public modificarModelo(id: number, modelo: Modelo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, modelo);
  }

}
