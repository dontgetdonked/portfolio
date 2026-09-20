import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
  Textarea,
} from '@/components/ui'
import { IconNotes, IconPin, IconPlus, IconTrash } from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { relative } from '@/lib/format'
import type { Note } from '@/types'

export default function Notes() {
  const { state, currentUser, userById, clientById, dispatch } = useStore()
  const [query, setQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('all')
  const [editing, setEditing] = useState<Note | 'new' | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.notes
      .filter((note) => {
        if (clientFilter === 'general' && note.clientId) return false
        if (clientFilter !== 'all' && clientFilter !== 'general' && note.clientId !== clientFilter)
          return false
        if (!q) return true
        return `${note.title} ${note.body}`.toLowerCase().includes(q)
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return +new Date(b.createdAt) - +new Date(a.createdAt)
      })
  }, [state.notes, query, clientFilter])

  return (
    <Page
      title="Note"
      subtitle={`${state.notes.length} note salvate · ${state.notes.filter((n) => n.pinned).length} fixate`}
      actions={
        <button className="btn btn-primary" onClick={() => setEditing('new')}>
          <IconPlus size={15} />
          Notă nouă
        </button>
      }
    >
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută în note…" />
        <Select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toate notele</option>
          <option value="general">Note generale</option>
          {state.clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      {rows.length === 0 ? (
        <Card>
          <EmptyState
            icon={IconNotes}
            title="Nicio notă găsită"
            description="Notele păstrează contextul pe care emailul îl pierde: condiții de plată, acces pe șantier, cine decide."
          />
        </Card>
      ) : (
        <div className="grid grid-3">
          {rows.map((note) => {
            const client = clientById(note.clientId)
            const author = userById(note.authorId)
            return (
              <article key={note.id} className="card note-card">
                <div className="row-between" style={{ alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 650, lineHeight: 1.35 }}>{note.title}</h3>
                  <span className="row" style={{ gap: 2 }}>
                    <button
                      className="btn-icon"
                      aria-label={note.pinned ? 'Anulează fixarea' : 'Fixează nota'}
                      style={{ color: note.pinned ? 'var(--accent)' : undefined }}
                      onClick={() =>
                        dispatch({
                          type: 'note.update',
                          id: note.id,
                          patch: { pinned: !note.pinned },
                        })
                      }
                    >
                      <IconPin size={14} />
                    </button>
                    {(author?.id === currentUser.id || currentUser.role === 'admin') && (
                      <button
                        className="btn-icon"
                        aria-label="Șterge nota"
                        onClick={() => dispatch({ type: 'note.remove', id: note.id })}
                      >
                        <IconTrash size={14} />
                      </button>
                    )}
                  </span>
                </div>

                {client && (
                  <Link to={`/clienti/${client.id}`} className="tag" style={{ alignSelf: 'start' }}>
                    {client.name}
                  </Link>
                )}

                <p className="note-body small">{note.body}</p>

                <div className="note-foot">
                  <Avatar user={author} size="sm" />
                  {author?.name}
                  <span style={{ marginLeft: 'auto' }}>{relative(note.createdAt)}</span>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {editing && <NoteForm onClose={() => setEditing(null)} />}
    </Page>
  )
}

function NoteForm({ onClose }: { onClose: () => void }) {
  const { state, currentUser, dispatch } = useStore()
  const [form, setForm] = useState({ title: '', body: '', clientId: '', pinned: false })

  const valid = form.title.trim().length > 2 && form.body.trim().length > 2

  const submit = () => {
    if (!valid) return
    dispatch({
      type: 'note.add',
      note: {
        id: uid('n'),
        title: form.title.trim(),
        body: form.body.trim(),
        clientId: form.clientId || undefined,
        authorId: currentUser.id,
        pinned: form.pinned,
        createdAt: new Date().toISOString(),
      },
    })
    onClose()
  }

  return (
    <Modal
      title="Notă nouă"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Salvează nota
          </button>
        </>
      }
    >
      <Field label="Titlu *">
        <Input
          autoFocus
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="ex. Condiții de plată"
        />
      </Field>

      <Field label="Conținut *">
        <Textarea
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          placeholder="Ce trebuie să știe colegii data viitoare când vorbesc cu acest client?"
        />
      </Field>

      <div className="form-row">
        <Field label="Client asociat">
          <Select
            value={form.clientId}
            onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}
          >
            <option value="">Notă generală</option>
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Fixare">
          <label className="row" style={{ gap: 8, paddingTop: 8 }}>
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={(e) => setForm((f) => ({ ...f, pinned: e.target.checked }))}
              style={{ accentColor: 'var(--accent)', width: 16, height: 16 }}
            />
            <span className="small">Fixează în capul listei</span>
          </label>
        </Field>
      </div>
    </Modal>
  )
}
