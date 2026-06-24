import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')

app.use(cors())
app.use(express.json())

const taskRouter = express.Router()
const tasks = [
  {
    id: randomUUID(),
    title: 'Revisar requisitos del proyecto',
    description: 'Confirmar alcance y entregables antes de empezar.',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

taskRouter.get('/', (req, res) => {
  res.json(tasks)
})

taskRouter.post('/', (req, res) => {
  const { title, description = '', status = 'pending' } = req.body || {}

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ message: 'El título es obligatorio.' })
  }

  if (!['pending', 'in_progress', 'done'].includes(status)) {
    return res.status(400).json({ message: 'Estado inválido.' })
  }

  const task = {
    id: randomUUID(),
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : '',
    status,
    createdAt: new Date().toISOString(),
  }

  tasks.push(task)
  return res.status(201).json(task)
})

taskRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada.' })
  }

  const { title, description, status } = req.body || {}

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ message: 'El título es obligatorio.' })
    }
    task.title = title.trim()
  }

  if (description !== undefined) {
    task.description = typeof description === 'string' ? description.trim() : ''
  }

  if (status !== undefined) {
    if (!['pending', 'in_progress', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Estado inválido.' })
    }
    task.status = status
  }

  return res.json(task)
})

taskRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const index = tasks.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada.' })
  }

  tasks.splice(index, 1)
  return res.json({ success: true })
})

app.use('/tasks', taskRouter)
app.use('/api/tasks', taskRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href

if (isMainModule) {
  app.listen(port, () => {
    console.log(`API de tareas escuchando en http://localhost:${port}`)
  })
}

export { app }
