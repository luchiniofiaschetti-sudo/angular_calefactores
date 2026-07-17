# Proyecto Angular - Catálogo de Calefactores

## Integrantes
- **Nombre:** Luciano Fiaschetti
- **DNI:** 38524820
- **Email:** luchiniofiaschetti@gmail.com
- **Localidad:** Tandil

---

## Descripción
Este proyecto es una aplicación web desarrollada en **Angular** que permite visualizar, administrar y consumir un catálogo de modelos y calefactores en tiempo real.  
La aplicación se conecta de forma reactiva con nuestra propia API (`api_calefactores`), la cual está desarrollada en **PHP** bajo una arquitectura **MVC** en **MySQL**.

---

## Funcionalidades principales
- **Listado dinámico** de modelos con filtrado por categorías y ordenamiento.
- **Panel de administración protegido**: Sistema de login seguro con manejo de tokens (JWT) para realizar operaciones CRUD.
- **CRUD (Panel Admin)**: Permite agregar, modificar y eliminar modelos con actualización automática de la interfaz sin necesidad de recargar la página.
- **Auto-Despliegue de Base de Datos**: El backend cuenta con una lógica de inicialización automática. No requiere importar ningún script `.sql` de forma manual.

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
1. Copiá la carpeta `api_calefactores` dentro de tu directorio `xampp/htdocs/`.
2. Abrí el panel de XAMPP e iniciá los módulos de **Apache** y **MySQL**.
3. *Nota:* No es necesario crear la base de datos ni importar tablas en phpMyAdmin. La API detectará la ausencia de la base de datos y la creará automáticamente con datos de prueba en la primera petición.

### 2. Levantar el Frontend (Angular)
1. Abrí una terminal dentro de la carpeta del proyecto de Angular (`calefactores`).
2. Iniciá el servidor de desarrollo de Angular: **ng serve**
4. Abrí tu navegador e ingresá a: `http://localhost:4200`

---

## Credenciales de acceso para pruebas (Panel Admin)
Para ingresar al panel de administración y probar las acciones de agregar, modificar o eliminar, utilizá los siguientes datos:

- **Usuario**: `webadmin` 
- **Contraseña**: `admin` 
