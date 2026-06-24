# PRUEBA TECNICA: GESTION DE TAREAS CON IA.
# ANDRES MORA

Esta aplicación permite gestionar tareas con un frontend en React y un backend en Express. Cumple con los endpoints solicitados y ofrece una interfaz simple, usable y responsiva.

# Funcionalidades
- Listar tareas
- Crear tarea
- Cambiar estado de una tarea
- Eliminar tarea
- Validaciones básicas y mensajes de error

# Requisitos
- Node.js 20+
- npm 10+

# Ejecutar en desarrollo
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia la app:
   ```bash
   npm run dev
   ```
3. Abre la URL del frontend y la API estará disponible en `/api/tasks`.

# Endpoints del backend
- `GET /tasks`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

La aplicación también acepta las rutas equivalentes bajo `/api/tasks` para facilitar la integración con el frontend.

# Documentación adicional
- Ver [AI_USAGE.md](AI_USAGE.md) para verificar el uso de IA.
