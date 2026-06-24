import { useEffect, useState } from 'react'
import './App.css'

const statusOptions = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'done', label: 'Completada' },
]

function App() {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const baseUrl = import.meta.env.PROD ? '' : '/api'
      const response = await fetch(`${baseUrl}/tasks`)
      if (!response.ok) {
        throw new Error('No se pudieron cargar las tareas')
      }
      const data = await response.json()
      setTasks(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('El título es obligatorio.')
      return
    }

    try {
      const baseUrl = import.meta.env.PROD ? '' : '/api'
      const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          status: form.status,
        }),
      })

      if (!response.ok) {
        throw new Error('No se pudo crear la tarea')
      }

      setForm({ title: '', description: '', status: 'pending' })
      setError('')
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleStatusChange = async (taskId, nextStatus) => {
    try {
      const baseUrl = import.meta.env.PROD ? '' : '/api'
      const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })

      if (!response.ok) {
        throw new Error('No se pudo actualizar el estado')
      }

      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (taskId) => {
    try {
      const baseUrl = import.meta.env.PROD ? '' : '/api'
      const response = await fetch(`${baseUrl}/tasks/${taskId}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('No se pudo eliminar la tarea')
      }
      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Prueba técnica SENA | Andres Mora</p>
          <h1>Gestión simple de tareas con IA</h1>
          <p className="hero-copy">
            Crea, organiza y actualiza tus tareas desde una interfaz clara y con una API funcional.
          </p>
        </div>
        <form className="task-form" onSubmit={handleSubmit}>
          <label>
            Título
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Ej. Revisar entregable"
            />
          </label>
          <label>
            Descripción
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Opcional"
              rows="3"
            />
          </label>
          <label>
            Estado inicial
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Agregar tarea</button>
        </form>
      </section>

      {error ? <p className="error-banner">{error}</p> : null}

      <section className="task-board">
        <div className="board-header">
          <h2>Listado de tareas</h2>
          <span>{tasks.length} tareas</span>
        </div>

        {loading ? (
          <p className="empty-state">Cargando tareas...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-state">Aún no hay tareas. Crea la primera desde el formulario.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div className="task-top">
                  <h3>{task.title}</h3>
                  <span className={`status-badge ${task.status}`}>{statusOptions.find((option) => option.value === task.status)?.label}</span>
                </div>
                {task.description ? <p className="task-description">{task.description}</p> : null}
                <p className="task-meta">Creada: {new Date(task.createdAt).toLocaleString()}</p>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(event) => handleStatusChange(task.id, event.target.value)}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button type="button" className="delete-btn" onClick={() => handleDelete(task.id)}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
