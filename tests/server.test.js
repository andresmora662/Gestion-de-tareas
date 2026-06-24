import request from 'supertest'
import { describe, it, expect, vi } from 'vitest'
import { app } from '../server.js'

describe('API de tareas', () => {
  it('debe devolver una lista de tareas', async () => {
    const response = await request(app).get('/tasks')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('debe crear una tarea cuando el título es válido', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({
        title: 'Tarea de prueba',
        description: 'Descripción de prueba',
        status: 'pending',
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.title).toBe('Tarea de prueba')
  })

  it('debe rechazar una tarea sin título', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ description: 'Sin título', status: 'pending' })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('El título es obligatorio.')
  })

  it('debe servir la app en la ruta raíz en producción', async () => {
    vi.resetModules()
    process.env.NODE_ENV = 'production'

    const { app: productionApp } = await import('../server.js')
    const response = await request(productionApp).get('/')

    expect(response.status).toBe(200)
  })
})
