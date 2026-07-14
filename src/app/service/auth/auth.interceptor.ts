import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service.js'; // Asegurá la ruta sin .js si no es necesario

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // ALERTA DE SEGURIDAD: Si la petición va hacia el endpoint de login de usuarios,
  // NO le agregamos el Bearer Token. La dejamos pasar limpia con su Basic Auth.
  if (req.url.includes('/usuarios')) {
    return next(req);
  }

  // Para cualquier otra ruta (como agregar o modificar modelos), sí inyectamos el token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
