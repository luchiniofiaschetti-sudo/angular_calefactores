import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Calefactor } from '../interfaces/calefactor.js';

@Injectable({ providedIn: 'root' })
export class CalefactorService {
  private apiUrl = 'http://localhost/api_calefactores/api';

  constructor(private http: HttpClient) {}

  // Trae todos los calefactores
  public getTodosLosCalefactores(): Observable<Calefactor[]> {
    return this.http.get<Calefactor[]>(`${this.apiUrl}/calefactores`)
      .pipe(map(data => data.map(c => this.mapCalefactor(c))));
  }

  // Trae calefactores de un modelo específico
  public getCalefactoresPorModelo(id_modelo: number): Observable<Calefactor[]> {
    return this.http.get<Calefactor[]>(`${this.apiUrl}/modelos/${id_modelo}/calefactores`)
      .pipe(map(data => data.map(c => this.mapCalefactor(c))));
  }

  // Normaliza los datos recibidos
  private mapCalefactor(c: any): Calefactor {
    return {
      ...c,
      potencia: Number(c.potencia),
      peso: Number(c.peso),
      precio: Number(c.precio),
      stock: Number(c.stock),
      cantidad: 0
    };
  }
}