import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '@/components/layout'
import { Avatar, Badge, Card, EmptyState, SearchInput, Select } from '@/components/ui'
import { LeadForm } from '@/components/LeadForm'
import { STAGE_COLOR } from '@/components/shared'
import { IconArrowRight, IconEdit, IconPipeline, IconPlus } from '@/components/icons'
import { useStore } from '@/store/store'
import { compactMoney, money, percent, relative } from '@/lib/format'
import { SERVICE_LABEL, STAGE_LABEL, STAGES, type Lead, type Stage } from '@/types'

export default function Pipeline() {
  const { state, can, userById, clientById, dispatch } = useStore()

  const [query, setQuery] = useState('')
  const [owner, setOwner] = useState('all')
  const [dragging, setDragging] = useState<string | null>(null)
  const [hoverStage, setHoverStage] = useState<Stage | null>(null)
  const [editing, setEditing] = useState<Lead | null>(null)
  const [creatingIn, setCreatingIn] = useState<Stage | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.leads.filter((lead) => {
      if (owner !== 'all' && lead.ownerId !== owner) return false
      if (!q) return true
      const client = clientById(lead.clientId)?.name ?? ''
      return `${lead.title} ${client}`.toLowerCase().includes(q)
    })
  }, [state.leads, query, owner, clientById])

  const columns = STAGES.map((stage) => {
    const items = visible
      .filter((l) => l.status === stage)
      .sort((a, b) => b.value - a.value)
    return { stage, items, sum: items.reduce((s, l) => s + l.value, 0) }
  })

  const lost = visible.filter((l) => l.status === 'pierdut')
  const totalOpen = columns
    .filter((c) => c.stage !== 'castigat')
    .reduce((s, c) => s + c.sum, 0)

  const onDrop = (stage: Stage) => {
    setHoverStage(null)
    if (!dragging || !can('pipeline.move')) return
    dispatch({ type: 'lead.move', id: dragging, status: stage })
    setDragging(null)
  }

  return (
    <Page
      title="Pipeline"
      subtitle={`${money(totalOpen)} în lucru · trage un card pentru a schimba etapa`}
      actions={
        can('leads.write') && (
          <button className="btn btn-primary" onClick={() => setCreatingIn('nou')}>
            <IconPlus size={15} />
            Lead nou
          </button>
        )
      }
    >
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută în pipeline…" />
        <Select value={owner} onChange={(e) => setOwner(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">Toți responsabilii</option>
          {state.users
            .filter((u) => u.active)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
        </Select>
        <Link to="/lead-uri" className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>
          Vizualizare tabel
          <IconArrowRight size={13} />
        </Link>
      </div>

      <div className="board">
        {columns.map(({ stage, items, sum }) => (
          <div
            key={stage}
            className={hoverStage === stage ? 'column drag-over' : 'column'}
            onDragOver={(e) => {
              if (!can('pipeline.move')) return
              e.preventDefault()
              setHoverStage(stage)
            }}
            onDragLeave={() => setHoverStage((s) => (s === stage ? null : s))}
            onDrop={() => onDrop(stage)}
          >
            <div className="column-head">
              <span
                className="badge-dot"
                style={{ background: STAGE_COLOR[stage], width: 8, height: 8 }}
              />
              <span className="column-title">{STAGE_LABEL[stage]}</span>
              <span className="badge">{items.length}</span>
              <span className="column-sum">{compactMoney(sum)} lei</span>
            </div>

            <div className="column-body">
              {items.map((lead) => {
                const client = clientById(lead.clientId)
                return (
                  <article
                    key={lead.id}
                    className={dragging === lead.id ? 'lead-card dragging' : 'lead-card'}
                    draggable={can('pipeline.move')}
                    onDragStart={() => setDragging(lead.id)}
                    onDragEnd={() => {
                      setDragging(null)
                      setHoverStage(null)
                    }}
                    onDoubleClick={() => can('leads.write') && setEditing(lead)}
                  >
                    <div className="row-between" style={{ alignItems: 'flex-start', gap: 8 }}>
                      <span className="lead-title">{lead.title}</span>
                      {can('leads.write') && (
                        <button
                          className="btn-icon"
                          style={{ padding: 3, marginTop: -2, marginRight: -3 }}
                          aria-label="Editează lead"
                          onClick={() => setEditing(lead)}
                        >
                          <IconEdit size={13} />
                        </button>
                      )}
                    </div>

                    {client && (
                      <Link to={`/clienti/${client.id}`} className="lead-client truncate">
                        {client.name}
                      </Link>
                    )}

                    <Badge>{SERVICE_LABEL[lead.service]}</Badge>

                    <div className="progress" title={`Probabilitate ${percent(lead.probability)}`}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${lead.probability}%`,
                          background: STAGE_COLOR[lead.status],
                        }}
                      />
                    </div>

                    <div className="lead-foot">
                      <span className="lead-value">{money(lead.value)}</span>
                      <span className="row" style={{ gap: 7 }}>
                        <span className="small" style={{ color: 'var(--text-3)' }}>
                          {relative(lead.expectedCloseAt)}
                        </span>
                        <Avatar user={userById(lead.ownerId)} size="sm" />
                      </span>
                    </div>
                  </article>
                )
              })}

              {can('leads.write') && (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: 'center', color: 'var(--text-3)' }}
                  onClick={() => setCreatingIn(stage)}
                >
                  <IconPlus size={14} />
                  Adaugă
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {lost.length > 0 && (
        <Card
          title="Lead-uri pierdute"
          action={<span className="small muted">{lost.length} înregistrări</span>}
          padded={false}
        >
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Client</th>
                  <th>Motiv</th>
                  <th className="right">Valoare</th>
                  <th>Închis</th>
                </tr>
              </thead>
              <tbody>
                {lost.map((lead) => (
                  <tr key={lead.id}>
                    <td className="cell-strong">{lead.title}</td>
                    <td className="cell-muted">{clientById(lead.clientId)?.name}</td>
                    <td className="cell-muted">{lead.lostReason ?? '—'}</td>
                    <td className="right num cell-muted">{money(lead.value)}</td>
                    <td className="cell-muted small">{relative(lead.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {visible.length === 0 && (
        <Card>
          <EmptyState
            icon={IconPipeline}
            title="Pipeline gol"
            description="Niciun lead nu corespunde filtrelor curente."
          />
        </Card>
      )}

      {editing && <LeadForm lead={editing} onClose={() => setEditing(null)} />}
      {creatingIn && (
        <LeadForm defaultStatus={creatingIn} onClose={() => setCreatingIn(null)} />
      )}
    </Page>
  )
}
