import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './service/auth/auth.service.js';

@Component({
  selector: 'app-root',
  standalone: true,             
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  // Inyección de dependencias
  public authService = inject(AuthService);
  private router = inject(Router);

  protected readonly title = signal('calefactores');
  
  // Flujo observable de login para usarlo en el HTML con el pipe async
  public isLoggedIn$ = this.authService.isLoggedIn$;
  public nombreUsuario: string = '';

  ngOnInit(): void {
    // Al iniciar, si ya hay una sesión guardada, recuperamos el nombre del localStorage
    if (localStorage.getItem('token')) {
      this.nombreUsuario = localStorage.getItem('usuarioAdmin') || 'Admin';
    }
  }

  // Función que se ejecuta al hacer clic en "Cerrar Sesión"
  public onLogout(): void {
    this.authService.logout(); // Limpia el BehaviorSubject y borra el token
    localStorage.removeItem('usuarioAdmin'); // Limpiamos el nombre
    this.nombreUsuario = '';
    
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/modelos']); // Redirigimos al catálogo público
  }
}
