# Instrucciones de ejecución

Esta aplicación permite gestionar tareas con un frontend en React y un backend en Express.

## Requisitos previos
- Node.js 20 o superior
- npm 10 o superior

## Opción 1: Ejecutar en desarrollo
1. Abre la terminal en la carpeta del proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```
4. Abre en tu navegador:
   - Frontend: http://localhost:5173/
   - Backend: http://localhost:3000/tasks

## Opción 2: Ejecutar solo el backend
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   node server.js
   ```
3. La API quedará disponible en:
   - http://localhost:3000/tasks

## Opción 3: Ejecutar con Docker
1. Asegúrate de tener Docker instalado.
2. Desde la carpeta del proyecto, construye la imagen:
   ```bash
   docker build -t prueba-tecnica-react .
   ```
3. Inicia el contenedor:
   ```bash
   docker run -p 5173:5173 -p 3000:3000 prueba-tecnica-react
   ```
4. Abre en tu navegador:
   - Frontend: http://localhost:5173/
   - Backend: http://localhost:3000/tasks

## Endpoints disponibles
- GET /tasks
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

## Notas
- La aplicación usa almacenamiento en memoria, por lo que los datos se reinician si se reinicia el servidor.
- Si el puerto 3000 está ocupado, el backend puede no iniciar correctamente hasta liberar ese puerto.
