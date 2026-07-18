import { Routes } from '@angular/router';
import { LoginComponent } from './component/login.component/login.component.js';
import { ModelosComponent } from './component/modelos.component/modelos.component.js';
import { CalefactorComponent } from './component/calefactor.component/calefactor.component.js';
import { PanelAdminComponent } from './component/panel-admin.component/panel-admin.component.js'; // <-- 1. Importamos tu Panel Admin
import { authGuard } from './service/auth/auth.guard.js'; // <-- 2. Importamos tu Guardián de seguridad

export const routes: Routes = [
  // Rutas Públicas (Cualquier visitante puede entrar)
  { path: '', redirectTo: 'modelos', pathMatch: 'full' },
  { path: 'modelos', component: ModelosComponent },
  { path: 'modelos/:id_modelo/calefactores', component: CalefactorComponent },
  { path: 'registrarse', component: LoginComponent }, // Mantenemos tu ruta actual de acceso al Login
  //  RUTA PROTEGIDA (Solo accesible para el Administrador Logueado)
  { 
    path: 'admin', 
    component: PanelAdminComponent, 
    canActivate: [authGuard] 
  },
  // RUTA COMODÍN: 
  { path: '**', redirectTo: 'modelos' }
];
