# Proyecto Angular - Catalogo de Calefactores

## Integrantes
- **Nombre:** Luciano Fiaschetti
- **DNI:** 38524820
- **Email:** luchiniofiaschetti@gmail.com
- **Localidad:** Tandil

---

## Descripcion
Este proyecto es una aplicacion web desarrollada en **Angular** que permite visualizar, administrar y consumir un catalogo de modelos y calefactores en tiempo real.  
La aplicacion se conecta de forma reactiva con nuestra propia API (`api_calefactores`), la cual esta desarrollada en **PHP** bajo una arquitectura **MVC** en **MySQL**.

---

## Funcionalidades principales
- **Listado dinamico** de modelos con filtrado por categorias y ordenamiento.
- **Panel de administración protegido**: Sistema de login seguro con manejo de tokens (JWT) para realizar operaciones CRUD.
- **CRUD (Panel Admin)**: Permite agregar, modificar y eliminar modelos con actualizacion automatica de la interfaz sin necesidad de recargar la pagina.
- **Auto-Despliegue de Base de Datos**: El backend cuenta con una logica de inicializacion automatica. No requiere importar ningún script `.sql` de forma manual.

---

## Requisitos previos
Para que el entorno completo funcione correctamente es necesario contar con:
- **Node.js** y **Angular CLI** instalados en el sistema.
   (creado con version:
      Angular CLI       : 22.0.1
      Angular           : 22.0.1
      Node.js           : 22.22.3
      Package Manager   : npm 10.9.8
      Operating System  : win32 ia32
   )
- **XAMPP** (servidor local con Apache y MySQL activos).
- La carpeta del backend `api_calefactores` ubicada dentro del directorio `htdocs` de XAMPP.

---

## Pasos para desplegar el proyecto

### 1. Levantar el Backend (API PHP)
1. Copia la carpeta `api_calefactores` dentro de tu directorio `xampp/htdocs/`.
2. Abri el panel de XAMPP e inicia los modulos de **Apache** y **MySQL**.
3. *Nota:* No es necesario crear la base de datos ni importar tablas en phpMyAdmin. La API detectara la ausencia de la base de datos y la creara automáticamente con datos de prueba en la primera petición.

### 2. Levantar el Frontend (Angular)
1. Abri una terminal dentro de la carpeta del proyecto de Angular (`calefactores`).
2. Inicia el servidor de desarrollo de Angular: **ng serve**
4. Abri tu navegador e ingresa a: `http://localhost:4200`

---

## Credenciales de acceso para pruebas (Panel Admin)
Para ingresar al panel de administracion y probar las acciones de agregar, modificar o eliminar, utiliza los siguientes datos:

- **Usuario**: `webadmin` 
- **Contraseña**: `admin` 


---

## Notas de Arquitectura y Escalabilidad
Como propuesta de mejora, se contemplan las siguientes optimizaciones:
- **Atomizacion de Componentes**: Separar el panel de administracion actual en componentes individuales mas pequeños y específicos (por ejemplo:         `FormAgregarComponent`, `FormModificarComponent` y `ListaAdminComponent`), facilitando el mantenimiento y la reutilizacion del codigo.
- **Abstraccion de Servicios**: Crear un servicio exclusivo para la administración (`AdminService`) separado del servicio general de modelos. Esto permitiria aislar por completo la logica de negocio del panel de control.
- **Modulos Estadisticos y de Control**: Incorporar funciones en el backend y frontend para gestionar calculos automaticos de porcentajes de stock, registros de auditoria sobre que administrador modifico cada recurso, indicadores comerciales de rendimiento, etc.
