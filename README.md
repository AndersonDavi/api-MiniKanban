# API de gestión de tareas

Esta API REST construida con `express` permite administrar una lista de tareas almacenada en una base de datos MySQL. Incluye operaciones para crear, consultar, actualizar y eliminar registros de la tabla `lista_tarea` dentro de la base de datos `tareas`.

## Requisitos previos
- **Node.js** v18 o superior.
- **MySQL Server** running locally on your machine.

## Instalación
- **Clonar el repositorio** y situarse en el directorio del proyecto.
- **Instalar dependencias**:
  ```bash
  npm install
  ```

## Configuración de la base de datos
- **Crear la base de datos y tabla necesarias** ejecutando el siguiente script SQL en MySQL:
  ```sql
  CREATE DATABASE IF NOT EXISTS tareas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE tareas;

  CREATE TABLE IF NOT EXISTS lista_tarea (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  ```
- **Actualizar credenciales** en `index.js` si tus valores de `host`, `user`, `password` o `database` difieren de los configurados por defecto.

## Ejecución en desarrollo
- **Iniciar el servidor** con:
  ```bash
  node index.js
  ```
- El servicio escuchará en `http://localhost:3000` por defecto. Ajusta el puerto en `index.js` si lo necesitas.

## Endpoints disponibles
- **GET `/tasks`**: devuelve todas las tareas.
- **POST `/tasks`**: crea una nueva tarea. Requiere `title`, `status` y `description` en el cuerpo JSON.
- **PUT `/tasks/:id`**: actualiza una tarea existente.
- **DELETE `/tasks/:id`**: elimina una tarea por su identificador.

## Despliegue
- **Configurar variables de entorno** o ajustar los valores en `index.js` antes de subir a producción (por ejemplo, credenciales MySQL y puerto).
- **Crear la base de datos** en el servidor de producción usando el mismo script SQL indicado en la sección de configuración.
- **Instalar dependencias** en el entorno de despliegue con `npm install`.
- **Iniciar la aplicación** usando `node index.js` o un gestor de procesos como `pm2` para mantener el servicio activo.
- **Exponer el puerto** 3000 (o el que definas) mediante el balanceador o firewall correspondiente.
