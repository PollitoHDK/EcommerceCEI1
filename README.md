# Proyecto de API Básica con Node.js, Express y React

Este proyecto es una aplicación web que incluye un backend desarrollado en **Node.js** con **Express** y un frontend construido con **React** y estilizado con **Tailwind CSS**. La aplicación permite la gestión de usuarios y productos, proporcionando funcionalidades tanto para administradores como para clientes. 

- **Administradores**: pueden agregar productos.
- **Clientes**: pueden explorar productos y realizar compras.

El backend utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios, asegurando que las operaciones sean realizadas por usuarios autenticados con los permisos adecuados.

---

## Características

### Backend
- **Node.js** con **Express**.
- **Autenticación con JWT** para usuarios admin y cliente.
- Gestión de productos y operaciones de compra.

### Frontend
- **React** para la creación de interfaces dinámicas.
- **Tailwind CSS** para un diseño limpio y responsivo.

---

## Guía de Instalación

Sigue estos pasos para poner en funcionamiento los servidores del proyecto.

### Prerrequisitos
1. Tener **Node.js** y **npm** instalados en tu máquina.
2. Clonar este repositorio:
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

## Paso a paso para funcionamiento de la APP
1. Viajar a directorio /backend
2. prender servidor con 'npm run start'
3. Viajar a directorio /frontend
4. prender servidor con 'npm start'
5. Ir a 'http://localhost:3000/' (Ojo, revisar que no haya conflicto de puertos en tu máquina local)
6. Crear cuenta como admin o cliente y realizar flujo de actividad.

## Nota importante: 
La DB funciona mediante un cluster de MONGO, por ende si intentas acceder con la API en tu local a la DB, debes asegurarte que en MongoDB esté registrada tu IP para poder acceder desde tu máquina y tu lugar de acceso.
