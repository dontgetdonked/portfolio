import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '@/components/layout'
import {
  Badge,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  SearchInput,
  Select,
  Textarea,
} from '@/components/ui'
import { CHANNEL_ICON, ChannelBadge } from '@/components/shared'
import { IconConversations, IconPlus } from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { dateTime, relative } from '@/lib/format'
import { CHANNEL_LABEL, type Channel, type Direction } from '@/types'

export default function Conversations() {
  const { state, userById, clientById, dispatch } = useStore()

  const [query, setQuery] = useState('')
  const [channel, setChannel] = useState<'all' | Channel>('all')
  const [clientFilter, setClientFilter] = useState('all')
  const [logging, setLogging] = useState(false)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.conversations
      .filter((conv) => {
        if (channel !== 'all' && conv.channel !== channel) return false
        if (clientFilter !== 'all' && conv.clientId !== clientFilter) return false
        if (!q) return true
        const client = clientById(conv.clientId)?.name ?? ''
        return `${conv.subject} ${conv.body} ${client}`.toLowerCase().includes(q)
      })
      .sort((a, b) => +new Date(b.at) - +new Date(a.at))
  }, [state.conversations, query, channel, clientFilter, clientById])

  /** Group by calendar day so the timeline reads like a log book. */
  const groups = useMemo(() => {
    const map = new Map<string, typeof rows>()
    rows.forEach((conv) => {
      const key = new Date(conv.at).toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
      map.set(key, [...(map.get(key) ?? []), conv])
    })
    return [...map.entries()]
  }, [rows])

  return (
    <Page
      title="Istoric conversații"
      subtitle={`${rows.length} interacțiuni înregistrate`}
      actions={
        <button className="btn btn-primary" onClick={() => setLogging(true)}>
          <IconPlus size={15} />
          Înregistrează conversație
        </button>
      }
    >
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută în conversații…" />
        <Select
          value={channel}
          onChange={(e) => setChannel(e.target.value as typeof channel)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toate canalele</option>
          {Object.entries(CHANNEL_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toți clienții</option>
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
            icon={IconConversations}
            title="Nicio conversație găsită"
            description="Fiecare apel, email sau întâlnire înregistrată aici rămâne în istoricul clientului."
          />
        </Card>
      ) : (
        groups.map(([day, items]) => (
          <Card key={day} title={day} action={<span className="small muted">{items.length}</span>}>
            <div className="timeline">
              {items.map((conv) => {
                const Icon = CHANNEL_ICON[conv.channel]
                const client = clientById(conv.clientId)
                return (
                  <div key={conv.id} className="timeline-item">
                    <span
                      className="timeline-dot"
                      style={{
                        color: conv.direction === 'in' ? 'var(--info)' : 'var(--accent)',
                      }}
                    >
                      <Icon size={15} />
                    </span>
                    <div className="timeline-body">
                      <div className="timeline-head">
                        <span className="timeline-subject">{conv.subject}</span>
                        <Badge tone={conv.direction === 'in' ? 'info' : 'accent'}>
                          {conv.direction === 'in' ? 'Primit' : 'Trimis'}
                        </Badge>
                        <ChannelBadge channel={conv.channel} />
                        <span className="timeline-time" title={dateTime(conv.at)}>
                          {relative(conv.at)}
                        </span>
                      </div>
                      <p className="timeline-text small">{conv.body}</p>
                      <span className="small" style={{ color: 'var(--text-3)' }}>
                        {client && (
                          <>
                            <Link to={`/clienti/${client.id}`} style={{ fontWeight: 550 }}>
                              {client.name}
                            </Link>
                            {' · '}
                          </>
                        )}
                        {userById(conv.userId)?.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        ))
      )}

      {logging && <ConversationForm onClose={() => setLogging(false)} />}
    </Page>
  )
}

function ConversationForm({ onClose }: { onClose: () => void }) {
  const { state, currentUser, dispatch } = useStore()
  const [form, setForm] = useState({
    clientId: state.clients[0]?.id ?? '',
    leadId: '',
    channel: 'telefon' as Channel,
    direction: 'out' as Direction,
    subject: '',
    body: '',
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const valid = form.clientId && form.subject.trim().length > 2

  const submit = () => {
    if (!valid) return
    dispatch({
      type: 'conversation.add',
      conversation: {
        id: uid('v'),
        clientId: form.clientId,
        leadId: form.leadId || undefined,
        channel: form.channel,
        direction: form.direction,
        subject: form.subject.trim(),
        body: form.body.trim(),
        userId: currentUser.id,
        at: new Date().toISOString(),
      },
    })
    onClose()
  }

  const leadsForClient = state.leads.filter((l) => l.clientId === form.clientId)

  return (
    <Modal
      title="Înregistrează o conversație"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Salvează
          </button>
        </>
      }
    >
      <div className="form-row">
        <Field label="Client *">
          <Select
            value={form.clientId}
            onChange={(e) => {
              set('clientId', e.target.value)
              set('leadId', '')
            }}
          >
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
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
      </div>

      <div className="form-row">
        <Field label="Canal">
          <Select value={form.channel} onChange={(e) => set('channel', e.target.value as Channel)}>
            {Object.entries(CHANNEL_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Direcție">
          <Select
            value={form.direction}
            onChange={(e) => set('direction', e.target.value as Direction)}
          >
            <option value="out">Trimis de noi</option>
            <option value="in">Primit de la client</option>
          </Select>
        </Field>
      </div>

      <Field label="Subiect *">
        <Input
          autoFocus
          value={form.subject}
          onChange={(e) => set('subject', e.target.value)}
          placeholder="ex. Clarificare cerințe finisaje"
        />
      </Field>

      <Field label="Rezumat">
        <Textarea
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          placeholder="Ce s-a discutat și ce urmează?"
        />
      </Field>
    </Modal>
  )
}
