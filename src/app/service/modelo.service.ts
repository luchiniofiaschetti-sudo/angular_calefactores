import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../interfaces/modelos.js';

@Injectable({ providedIn: 'root' })
export class ModeloService {
  private apiUrl = 'http://localhost/api_calefactores/api/modelos';

  constructor(private http: HttpClient) {}

  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}`);
  }

  public getModeloById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}/calefactores`);
  }

  public getCalefactoresDeModelo(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/calefactores`);
  }

  public getModelosFiltrados(campo: string, filtro: string): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}?campo=${campo}&filtro=${filtro}`);
  }
  
  public agregarModelo(modelo: Modelo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, modelo);
  }

  public modificarModelo(id_modelo: number, modelo: Modelo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id_modelo}`, modelo);
  }

  public eliminarModelo(id_modelo: number): Observable <any> {
    return  this.http.delete(`${this.apiUrl}/${id_modelo}`);
  }
}
