import { useMemo, useState } from 'react'
import { Page } from '@/components/layout'
import {
  Avatar,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  SearchInput,
  Select,
  Tabs,
  Textarea,
} from '@/components/ui'
import { DueDate, PriorityBadge } from '@/components/shared'
import { IconCheck, IconLeads, IconPlus, IconTasks, IconTrash, IconUser } from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { addDays } from '@/lib/format'
import { PRIORITY_LABEL, type Task, type TaskPriority } from '@/types'

type Scope = 'mine' | 'all' | 'done'

export default function Tasks() {
  const { state, currentUser, can, userById, clientById, leadById, dispatch } = useStore()

  const [scope, setScope] = useState<Scope>('mine')
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState<'all' | TaskPriority>('all')
  const [creating, setCreating] = useState(false)

  const openTasks = state.tasks.filter((t) => !t.done)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.tasks
      .filter((task) => {
        if (scope === 'done' && !task.done) return false
        if (scope !== 'done' && task.done) return false
        if (scope === 'mine' && task.assigneeId !== currentUser.id) return false
        if (priority !== 'all' && task.priority !== priority) return false
        if (!q) return true
        return `${task.title} ${task.description}`.toLowerCase().includes(q)
      })
      .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt))
  }, [state.tasks, scope, query, priority, currentUser.id])

  const overdue = rows.filter((t) => !t.done && new Date(t.dueAt).getTime() < Date.now()).length

  return (
    <Page
      title="Task-uri"
      subtitle={
        overdue > 0
          ? `${rows.length} task-uri afișate · ${overdue} depășite`
          : `${rows.length} task-uri afișate`
      }
      actions={
        can('tasks.write') && (
          <button className="btn btn-primary" onClick={() => setCreating(true)}>
            <IconPlus size={15} />
            Task nou
          </button>
        )
      }
    >
      <Tabs<Scope>
        active={scope}
        onChange={setScope}
        tabs={[
          {
            id: 'mine',
            label: 'Ale mele',
            count: openTasks.filter((t) => t.assigneeId === currentUser.id).length,
          },
          { id: 'all', label: 'Toate deschise', count: openTasks.length },
          { id: 'done', label: 'Finalizate', count: state.tasks.length - openTasks.length },
        ]}
      />

      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută task…" />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as typeof priority)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toate prioritățile</option>
          {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState
            icon={IconTasks}
            title={scope === 'done' ? 'Niciun task finalizat' : 'Niciun task deschis'}
            description="Adaugă un task pentru pașii următori din pipeline."
          />
        ) : (
          rows.map((task) => {
            const client = clientById(task.clientId)
            const lead = leadById(task.leadId)
            return (
              <div key={task.id} className={task.done ? 'task-row done' : 'task-row'}>
                <button
                  className="checkbox"
                  data-checked={String(task.done)}
                  aria-label={task.done ? 'Marchează ca nefinalizat' : 'Marchează ca finalizat'}
                  disabled={!can('tasks.write')}
                  onClick={() => dispatch({ type: 'task.toggle', id: task.id })}
                >
                  {task.done && <IconCheck size={12} />}
                </button>

                <div className="task-main">
                  <span className="task-title">{task.title}</span>
                  {task.description && <span className="small muted">{task.description}</span>}
                  <span className="task-meta">
                    <DueDate iso={task.dueAt} done={task.done} />
                    <span className="meta-chip">
                      <Avatar user={userById(task.assigneeId)} size="sm" />
                      {userById(task.assigneeId)?.name.split(' ')[0]}
                    </span>
                    {client && (
                      <span className="meta-chip">
                        <IconUser size={13} />
                        {client.name}
                      </span>
                    )}
                    {lead && (
                      <span className="meta-chip">
                        <IconLeads size={13} />
                        {lead.title}
                      </span>
                    )}
                  </span>
                </div>

                <div className="row" style={{ gap: 6 }}>
                  <PriorityBadge priority={task.priority} />
                  {can('tasks.write') && (
                    <button
                      className="btn-icon"
                      aria-label="Șterge task"
                      onClick={() => dispatch({ type: 'task.remove', id: task.id })}
                    >
                      <IconTrash size={15} />
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </Card>

      {creating && <TaskForm onClose={() => setCreating(false)} />}
    </Page>
  )
}

function TaskForm({ onClose }: { onClose: () => void }) {
  const { state, currentUser, dispatch } = useStore()
  const defaultDue = addDays(new Date(), 2)
  defaultDue.setHours(10, 0, 0, 0)

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueAt: toLocalInput(defaultDue),
    priority: 'medie' as TaskPriority,
    assigneeId: currentUser.id,
    clientId: '',
    leadId: '',
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const valid = form.title.trim().length > 2

  const submit = () => {
    if (!valid) return
    const task: Task = {
      id: uid('t'),
      title: form.title.trim(),
      description: form.description.trim(),
      done: false,
      dueAt: new Date(form.dueAt).toISOString(),
      priority: form.priority,
      assigneeId: form.assigneeId,
      clientId: form.clientId || undefined,
      leadId: form.leadId || undefined,
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'task.add', task })
    onClose()
  }

  const leadsForClient = form.clientId
    ? state.leads.filter((l) => l.clientId === form.clientId)
    : state.leads

  return (
    <Modal
      title="Task nou"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Adaugă task
          </button>
        </>
      }
    >
      <Field label="Titlu *">
        <Input
          autoFocus
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="ex. Trimite oferta revizuită"
        />
      </Field>

      <Field label="Detalii">
        <Textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          style={{ minHeight: 70 }}
        />
      </Field>

      <div className="form-row">
        <Field label="Scadență">
          <Input
            type="datetime-local"
            value={form.dueAt}
            onChange={(e) => set('dueAt', e.target.value)}
          />
        </Field>
        <Field label="Prioritate">
          <Select
            value={form.priority}
            onChange={(e) => set('priority', e.target.value as TaskPriority)}
          >
            {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Responsabil">
          <Select value={form.assigneeId} onChange={(e) => set('assigneeId', e.target.value)}>
            {state.users
              .filter((u) => u.active)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="Client">
          <Select
            value={form.clientId}
            onChange={(e) => {
              set('clientId', e.target.value)
              set('leadId', '')
            }}
          >
            <option value="">Fără client</option>
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Lead asociat">
        <Select value={form.leadId} onChange={(e) => set('leadId', e.target.value)}>
          <option value="">Fără lead</option>
          {leadsForClient.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </Select>
      </Field>
    </Modal>
  )
}

/** `datetime-local` needs a local, second-less value; toISOString would shift the zone. */
function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
