import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// CORRECCIÓN A: Quitamos el .js del import para que el compilador encuentre el módulo
import { AuthService } from '../../service/auth/auth.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formLogin: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onLogin(): void {
    if (this.formLogin.invalid) {
      return;
    }

    const { usuario, password } = this.formLogin.value;

    this.authService.login(usuario, password).subscribe({
      next: (token: string) => {
        // 1. Guardamos el nombre del usuario en el almacenamiento local
        localStorage.setItem('usuarioAdmin', usuario);

        console.log('Login correcto. Token verificado:', token);
        alert(`¡Bienvenido ${usuario}!`);

        /* 
          2. TRUCO DE SINCRONIZACIÓN MÁGICA:
          Para que el componente principal 'App' se entere del nombre en este preciso segundo
          sin necesidad de recargar la página con F5, forzamos una recarga limpia del navegador.
          Esto limpia la memoria de Angular, activa el Interceptor y dibuja el saludo al instante.
        */
        window.location.href = '/admin'; 
      },
      error: (err: any) => {
        console.error('Fallo en la autenticación:', err);
        alert('Usuario o contraseña incorrectos. Intente nuevamente.');
      }
    });
  }

}
