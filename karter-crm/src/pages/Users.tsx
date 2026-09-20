import { useState } from 'react'
import { Page } from '@/components/layout'
import {
  Avatar,
  Badge,
  Card,
  ConfirmDialog,
  Field,
  Input,
  Modal,
  Select,
} from '@/components/ui'
import { IconCheck, IconClose, IconMail, IconPhone, IconPlus, IconTrash } from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { date, initialsOf, money } from '@/lib/format'
import { ROLE_LABEL, ROLE_PERMISSIONS, type Role, type User } from '@/types'

const PERMISSION_LABEL: Record<string, string> = {
  'clients.write': 'Adaugă și editează clienți',
  'leads.write': 'Adaugă și editează lead-uri',
  'pipeline.move': 'Mută lead-uri în pipeline',
  'tasks.write': 'Gestionează task-uri și calendar',
  'invoices.write': 'Emite oferte și facturi',
  'invoices.delete': 'Șterge documente financiare',
  'users.manage': 'Gestionează utilizatori',
  'settings.manage': 'Modifică setările firmei',
}

const AVATAR_COLORS = ['#4f46e5', '#0891b2', '#d97706', '#db2777', '#16a34a', '#7c3aed', '#be123c']

export default function Users() {
  const { state, currentUser, dispatch } = useStore()
  const [creating, setCreating] = useState(false)
  const [removing, setRemoving] = useState<User | null>(null)

  const wonByUser = (userId: string) =>
    state.leads
      .filter((l) => l.status === 'castigat' && l.ownerId === userId)
      .reduce((sum, l) => sum + l.value, 0)

  const openTasks = (userId: string) =>
    state.tasks.filter((t) => !t.done && t.assigneeId === userId).length

  return (
    <Page
      title="Utilizatori și roluri"
      subtitle={`${state.users.filter((u) => u.active).length} utilizatori activi`}
      actions={
        <button className="btn btn-primary" onClick={() => setCreating(true)}>
          <IconPlus size={15} />
          Invită utilizator
        </button>
      }
    >
      <Card padded={false}>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Utilizator</th>
                <th>Contact</th>
                <th>Rol</th>
                <th>Status</th>
                <th className="right">Contracte câștigate</th>
                <th className="right">Task-uri deschise</th>
                <th>În echipă din</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {state.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="row" style={{ gap: 10 }}>
                      <Avatar user={user} />
                      <span>
                        <span className="cell-strong" style={{ display: 'block' }}>
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="small muted"> (tu)</span>
                          )}
                        </span>
                        <span className="small muted">{user.email}</span>
                      </span>
                    </span>
                  </td>
                  <td className="cell-muted small">
                    <span className="meta-chip" style={{ display: 'flex' }}>
                      <IconPhone size={12} />
                      {user.phone}
                    </span>
                    <span className="meta-chip" style={{ display: 'flex' }}>
                      <IconMail size={12} />
                      {user.email}
                    </span>
                  </td>
                  <td>
                    <Select
                      value={user.role}
                      onChange={(e) =>
                        dispatch({
                          type: 'user.update',
                          id: user.id,
                          patch: { role: e.target.value as Role },
                        })
                      }
                      style={{ width: 'auto', padding: '4px 26px 4px 8px', fontSize: 12 }}
                    >
                      {Object.entries(ROLE_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() =>
                        dispatch({
                          type: 'user.update',
                          id: user.id,
                          patch: { active: !user.active },
                        })
                      }
                    >
                      <Badge tone={user.active ? 'success' : 'neutral'} dot>
                        {user.active ? 'Activ' : 'Inactiv'}
                      </Badge>
                    </button>
                  </td>
                  <td className="right num cell-strong">{money(wonByUser(user.id))}</td>
                  <td className="right num cell-muted">{openTasks(user.id)}</td>
                  <td className="cell-muted small">{date(user.joinedAt)}</td>
                  <td className="right">
                    <button
                      className="btn-icon"
                      aria-label={`Șterge ${user.name}`}
                      disabled={user.id === currentUser.id}
                      onClick={() => setRemoving(user)}
                    >
                      <IconTrash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Matrice de permisiuni" padded={false}>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Permisiune</th>
                {(Object.keys(ROLE_LABEL) as Role[]).map((role) => (
                  <th key={role} className="right">
                    {ROLE_LABEL[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(PERMISSION_LABEL).map(([permission, label]) => (
                <tr key={permission}>
                  <td className="cell-strong">{label}</td>
                  {(Object.keys(ROLE_LABEL) as Role[]).map((role) => {
                    const allowed = (ROLE_PERMISSIONS[role] as string[]).includes(permission)
                    return (
                      <td key={role} className="right">
                        <span
                          style={{
                            display: 'inline-grid',
                            placeItems: 'center',
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background: allowed ? 'var(--success-soft)' : 'var(--neutral-soft)',
                            color: allowed ? 'var(--success)' : 'var(--text-3)',
                          }}
                          title={allowed ? 'Permis' : 'Interzis'}
                        >
                          {allowed ? <IconCheck size={12} /> : <IconClose size={12} />}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {creating && <UserForm onClose={() => setCreating(false)} />}
      {removing && (
        <ConfirmDialog
          title="Șterge utilizatorul"
          message={`Ștergi contul lui ${removing.name}. Lead-urile și task-urile rămân, dar fără responsabil valid.`}
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            dispatch({ type: 'user.remove', id: removing.id })
            setRemoving(null)
          }}
        />
      )}
    </Page>
  )
}

function UserForm({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'agent' as Role,
  })

  const valid = form.name.trim().length > 2 && form.email.includes('@')

  const submit = () => {
    if (!valid) return
    dispatch({
      type: 'user.add',
      user: {
        id: uid('u'),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        initials: initialsOf(form.name),
        color: AVATAR_COLORS[state.users.length % AVATAR_COLORS.length]!,
        active: true,
        joinedAt: new Date().toISOString(),
      },
    })
    onClose()
  }

  return (
    <Modal
      title="Invită utilizator"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Adaugă în echipă
          </button>
        </>
      }
    >
      <div className="form-row">
        <Field label="Nume complet *">
          <Input
            autoFocus
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="ex. Ana Petrescu"
          />
        </Field>
        <Field label="Rol">
          <Select
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}
          >
            {Object.entries(ROLE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Email *">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="nume@karter.ro"
          />
        </Field>
        <Field label="Telefon">
          <Input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+40 7xx xxx xxx"
          />
        </Field>
      </div>

      <div className="stack small muted">
        <span className="field-label">Permisiuni pentru rolul ales</span>
        {ROLE_PERMISSIONS[form.role].map((permission) => (
          <span key={permission} className="meta-chip">
            <IconCheck size={12} />
            {PERMISSION_LABEL[permission]}
          </span>
        ))}
      </div>
    </Modal>
  )
}
