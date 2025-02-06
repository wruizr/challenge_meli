# Challenge técnico Frontend Meli SYI

Este proyecto consiste en una aplicación que tiene un **Frontend** y un **Backend** que se comunican entre sí. El **Frontend** está desarrollado en React y el **Backend** está desarrollado en Node.js. Ambos servicios se despliegan y ejecutan en contenedores Docker usando `docker-compose`.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
.
├── backend/
│   ├── Dockerfile
│   ├── .env
│   └── (Archivos del Backend)
├── frontend/
│   ├── Dockerfile
│   ├── .env
│   └── (Archivos del Frontend)
└── docker-compose.yml
```

- **Frontend**: Una aplicación React que se conecta al servicio del backend a través de la API.
- **Backend**: Un servicio Node.js que maneja las peticiones de la API.
- **docker-compose.yml**: El archivo de configuración para levantar ambos servicios (Frontend y Backend) de manera conjunta en contenedores Docker.

## Pre-requisitos

Para poder levantar el proyecto, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Levantar el Proyecto con Docker Compose

1. **Clona este repositorio** (si aún no lo has hecho):

   ```bash
   git clone https://github.com/wruizr/challenge_meli.git
   cd challenge_meli
   ```

2. **Construir y levantar los servicios**:

   Asegúrate de que te encuentras en el directorio raíz del proyecto (donde se encuentra el archivo `docker-compose.yml`), luego ejecuta:

   ```bash
   docker-compose up --build
   ```

   Este comando realiza lo siguiente:
   - Construye las imágenes de Docker para el **Frontend** y el **Backend** según los `Dockerfile` respectivos.
   - Levanta los contenedores de **Frontend** y **Backend** en los puertos definidos en el archivo `docker-compose.yml`.

3. **Accede a la aplicación**:

   - El **Frontend** estará disponible en [http://localhost:3000](http://localhost:3000).
   - El **Backend** estará disponible en [http://localhost:3001](http://localhost:3001).

## Archivos `.env`

Asegúrate de tener los archivos `.env` configurados correctamente en las carpetas correspondientes:

- **Frontend (`./frontend/.env`)**:
  
  ```env
  REACT_APP_API_URL=http://backend:3001
  ```

- **Backend (`./backend/.env`)**:
  
  ```env
  API_BASE_URL_MELI=https://api.mercadolibre.com
  NODE_ENV=production
  PORT=3001
  ```

## Comandos Útiles

- **Detener los servicios**:

  Para detener los contenedores de Docker sin eliminarlos, puedes ejecutar:

  ```bash
  docker-compose stop
  ```

- **Eliminar contenedores y volúmenes**:

  Para eliminar los contenedores y volúmenes creados por `docker-compose`, ejecuta:

  ```bash
  docker-compose down -v
  ```

- **Ver logs**:

  Para ver los logs de los servicios, usa:

  ```bash
  docker-compose logs
  ```

## Desarrollo

Si necesitas hacer cambios en el código, puedes hacerlos directamente en las carpetas `frontend` y `backend`. Docker reconstruirá las imágenes automáticamente al usar `--build` al ejecutar `docker-compose up`.
