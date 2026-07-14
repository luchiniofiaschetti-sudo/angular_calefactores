import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api_calefactores/api';
  private http = inject(HttpClient);

  private loggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  /**
   * CORRECCIÓN: Cambiamos el tipo de retorno de Observable<{ token: string }> a Observable<string>
   * para que coincida exactamente con el string de texto que devuelve tu controlador de PHP.
   */
  public login(usuario: string, password: string): Observable<string> {
    const credencialesBase64 = btoa(`${usuario}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credencialesBase64}`
    });

    // CORRECCIÓN: Tipamos el método http.get<string> para indicarle que la respuesta es un string plano
    return this.http.get<string>(`${this.apiUrl}/usuarios`, { headers }).pipe(
      tap((tokenResultante: string) => {
        // Guardamos el token en localStorage bajo la clave única 'token'
        localStorage.setItem('token', tokenResultante);

        // Actualizamos el estado global reactivo
        this.loggedInSubject.next(true);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
