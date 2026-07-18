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

  public login(usuario: string, password: string): Observable<string> {
    const credencialesBase64 = btoa(`${usuario}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credencialesBase64}`
    });

    return this.http.get<string>(`${this.apiUrl}/usuarios`, { headers }).pipe(
      tap((tokenResultante: string) => {
        localStorage.setItem('token', tokenResultante);
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
