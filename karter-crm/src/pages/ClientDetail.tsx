import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/components/layout'
import { Avatar, Badge, Card, EmptyState, Tabs } from '@/components/ui'
import { ClientForm } from '@/pages/Clients'
import {
  ChannelBadge,
  CHANNEL_ICON,
  DocStatusBadge,
  DueDate,
  StageBadge,
} from '@/components/shared'
import {
  IconBuilding,
  IconChevronLeft,
  IconClients,
  IconConversations,
  IconEdit,
  IconInvoices,
  IconMail,
  IconMapPin,
  IconNotes,
  IconPhone,
  IconTasks,
  IconUser,
} from '@/components/icons'
import { useStore } from '@/store/store'
import { date, dateTime, docTotals, money, relative } from '@/lib/format'
import { SERVICE_LABEL } from '@/types'

type Tab = 'leads' | 'conversations' | 'notes' | 'tasks' | 'documents'

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state, can, userById } = useStore()
  const [tab, setTab] = useState<Tab>('leads')
  const [editing, setEditing] = useState(false)

  const client = state.clients.find((c) => c.id === id)

  if (!client) {
    return (
      <Page title="Client inexistent">
        <Card>
          <EmptyState
            icon={IconClients}
            title="Clientul nu a fost găsit"
            description="Probabil a fost șters sau datele demo au fost resetate."
            action={
              <Link to="/clienti" className="btn">
                Înapoi la clienți
              </Link>
            }
          />
        </Card>
      </Page>
    )
  }

  const leads = state.leads.filter((l) => l.clientId === client.id)
  const conversations = state.conversations
    .filter((c) => c.clientId === client.id)
    .sort((a, b) => +new Date(b.at) - +new Date(a.at))
  const notes = state.notes.filter((n) => n.clientId === client.id)
  const tasks = state.tasks.filter((t) => t.clientId === client.id)
  const documents = state.documents.filter((d) => d.clientId === client.id)

  const totalValue = leads.reduce((s, l) => s + l.value, 0)
  const wonValue = leads.filter((l) => l.status === 'castigat').reduce((s, l) => s + l.value, 0)
  const owner = userById(client.ownerId)

  return (
    <Page
      title={client.name}
      subtitle={`${client.type === 'firma' ? 'Firmă' : 'Persoană fizică'} · client din ${date(client.createdAt)}`}
      actions={
        <>
          <button className="btn" onClick={() => navigate('/clienti')}>
            <IconChevronLeft size={15} />
            Înapoi
          </button>
          {can('clients.write') && (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              <IconEdit size={15} />
              Editează
            </button>
          )}
        </>
      }
    >
      <Card padded={false}>
        <div className="detail-header">
          <span
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--accent-soft)',
              color: 'var(--accent-text)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            {client.type === 'firma' ? <IconBuilding size={24} /> : <IconUser size={24} />}
          </span>
          <div className="grow">
            <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.015em' }}>
                {client.name}
              </h2>
              {client.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="row small muted" style={{ gap: 16, marginTop: 6, flexWrap: 'wrap' }}>
              <span className="meta-chip">
                <IconUser size={13} />
                {client.contactPerson || '—'}
              </span>
              <a className="meta-chip" href={`tel:${client.phone}`}>
                <IconPhone size={13} />
                {client.phone}
              </a>
              {client.email && (
                <a className="meta-chip" href={`mailto:${client.email}`}>
                  <IconMail size={13} />
                  {client.email}
                </a>
              )}
              <span className="meta-chip">
                <IconMapPin size={13} />
                {client.address}, {client.city}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-facts">
          <div>
            <div className="fact-label">Responsabil</div>
            <div className="fact-value row" style={{ gap: 8 }}>
              <Avatar user={owner} size="sm" />
              {owner?.name}
            </div>
          </div>
          <div>
            <div className="fact-label">Valoare totală lead-uri</div>
            <div className="fact-value num">{money(totalValue)}</div>
          </div>
          <div>
            <div className="fact-label">Contracte câștigate</div>
            <div className="fact-value num">{money(wonValue)}</div>
          </div>
          <div>
            <div className="fact-label">Ultima interacțiune</div>
            <div className="fact-value">
              {conversations[0] ? relative(conversations[0].at) : 'Fără interacțiuni'}
            </div>
          </div>
          {client.cui && (
            <div>
              <div className="fact-label">CUI</div>
              <div className="fact-value num">{client.cui}</div>
            </div>
          )}
        </div>
      </Card>

      <Tabs<Tab>
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'leads', label: 'Lead-uri', count: leads.length },
          { id: 'conversations', label: 'Conversații', count: conversations.length },
          { id: 'notes', label: 'Note', count: notes.length },
          { id: 'tasks', label: 'Task-uri', count: tasks.length },
          { id: 'documents', label: 'Documente', count: documents.length },
        ]}
      />

      {tab === 'leads' &&
        (leads.length === 0 ? (
          <Card>
            <EmptyState icon={IconClients} title="Niciun lead pentru acest client" />
          </Card>
        ) : (
          <Card padded={false}>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Serviciu</th>
                    <th>Status</th>
                    <th>Responsabil</th>
                    <th className="right">Valoare</th>
                    <th>Actualizat</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="cell-strong">{lead.title}</td>
                      <td className="cell-muted">{SERVICE_LABEL[lead.service]}</td>
                      <td>
                        <StageBadge status={lead.status} />
                      </td>
                      <td>
                        <Avatar user={userById(lead.ownerId)} size="sm" />
                      </td>
                      <td className="right num cell-strong">{money(lead.value)}</td>
                      <td className="cell-muted small">{relative(lead.updatedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}

      {tab === 'conversations' && (
        <Card>
          {conversations.length === 0 ? (
            <EmptyState icon={IconConversations} title="Nicio conversație înregistrată" />
          ) : (
            <div className="timeline">
              {conversations.map((conv) => {
                const Icon = CHANNEL_ICON[conv.channel]
                return (
                  <div key={conv.id} className="timeline-item">
                    <span className="timeline-dot">
                      <Icon size={15} />
                    </span>
                    <div className="timeline-body">
                      <div className="timeline-head">
                        <span className="timeline-subject">{conv.subject}</span>
                        <Badge tone={conv.direction === 'in' ? 'info' : 'accent'}>
                          {conv.direction === 'in' ? 'Primit' : 'Trimis'}
                        </Badge>
                        <ChannelBadge channel={conv.channel} />
                        <span className="timeline-time">{dateTime(conv.at)}</span>
                      </div>
                      <p className="timeline-text small">{conv.body}</p>
                      <span className="small" style={{ color: 'var(--text-3)' }}>
                        Înregistrat de {userById(conv.userId)?.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}

      {tab === 'notes' &&
        (notes.length === 0 ? (
          <Card>
            <EmptyState icon={IconNotes} title="Nicio notă pentru acest client" />
          </Card>
        ) : (
          <div className="grid grid-2">
            {notes.map((note) => (
              <article key={note.id} className="card note-card">
                <h3 style={{ fontSize: 14, fontWeight: 650 }}>{note.title}</h3>
                <p className="note-body small">{note.body}</p>
                <div className="note-foot">
                  <Avatar user={userById(note.authorId)} size="sm" />
                  {userById(note.authorId)?.name}
                  <span style={{ marginLeft: 'auto' }}>{relative(note.createdAt)}</span>
                </div>
              </article>
            ))}
          </div>
        ))}

      {tab === 'tasks' && (
        <Card padded={false}>
          {tasks.length === 0 ? (
            <EmptyState icon={IconTasks} title="Niciun task legat de acest client" />
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={task.done ? 'task-row done' : 'task-row'}>
                <span className="checkbox" data-checked={String(task.done)} aria-hidden="true" />
                <span className="task-main">
                  <span className="task-title">{task.title}</span>
                  <span className="task-meta">
                    <DueDate iso={task.dueAt} done={task.done} />
                    <span className="meta-chip">
                      <Avatar user={userById(task.assigneeId)} size="sm" />
                      {userById(task.assigneeId)?.name.split(' ')[0]}
                    </span>
                  </span>
                </span>
              </div>
            ))
          )}
        </Card>
      )}

      {tab === 'documents' && (
        <Card padded={false}>
          {documents.length === 0 ? (
            <EmptyState icon={IconInvoices} title="Niciun document emis" />
          ) : (
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Număr</th>
                    <th>Tip</th>
                    <th>Status</th>
                    <th>Emis</th>
                    <th>Scadent</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="cell-strong">{doc.number}</td>
                      <td className="cell-muted">{doc.kind === 'factura' ? 'Factură' : 'Ofertă'}</td>
                      <td>
                        <DocStatusBadge status={doc.status} />
                      </td>
                      <td className="cell-muted small">{date(doc.issuedAt)}</td>
                      <td className="cell-muted small">{date(doc.dueAt)}</td>
                      <td className="right num cell-strong">
                        {money(docTotals(doc.lines, doc.vatRate).total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {editing && <ClientForm client={client} onClose={() => setEditing(false)} />}
    </Page>
  )
}
