// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service.js';

/**
 * Guard de autenticación:
 * - Se ejecuta antes de cargar una ruta protegida.
 * - Si hay token → acceso permitido.
 * - Si no hay token → redirige al login.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el usuario está logueado
  const token = authService.getToken();

  if (token) {
    // ✅ Hay token → acceso permitido
    return true;
  } else {
    // ❌ No hay token → redirigimos al login
    router.navigate(['/login']);
    return false;
  }
};
