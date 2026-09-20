import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '@/components/layout'
import {
  Avatar,
  Badge,
  Card,
  ConfirmDialog,
  EmptyState,
  SearchInput,
  Select,
} from '@/components/ui'
import { LeadForm } from '@/components/LeadForm'
import { StageBadge } from '@/components/shared'
import { IconEdit, IconLeads, IconPlus, IconTrash } from '@/components/icons'
import { useStore } from '@/store/store'
import { money, relative, percent } from '@/lib/format'
import { SERVICE_LABEL, SOURCE_LABEL, type Lead, type LeadStatus } from '@/types'

type SortKey = 'value' | 'updatedAt' | 'expectedCloseAt' | 'probability'

export default function Leads() {
  const { state, can, userById, clientById, dispatch } = useStore()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | 'open' | LeadStatus>('open')
  const [owner, setOwner] = useState('all')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'value', dir: -1 })
  const [editing, setEditing] = useState<Lead | 'new' | null>(null)
  const [removing, setRemoving] = useState<Lead | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.leads
      .filter((lead) => {
        if (status === 'open' && (lead.status === 'castigat' || lead.status === 'pierdut')) return false
        if (status !== 'all' && status !== 'open' && lead.status !== status) return false
        if (owner !== 'all' && lead.ownerId !== owner) return false
        if (!q) return true
        const client = clientById(lead.clientId)?.name ?? ''
        return `${lead.title} ${client}`.toLowerCase().includes(q)
      })
      .sort((a, b) => {
        const dir = sort.dir
        switch (sort.key) {
          case 'updatedAt':
            return (+new Date(a.updatedAt) - +new Date(b.updatedAt)) * dir
          case 'expectedCloseAt':
            return (+new Date(a.expectedCloseAt) - +new Date(b.expectedCloseAt)) * dir
          case 'probability':
            return (a.probability - b.probability) * dir
          default:
            return (a.value - b.value) * dir
        }
      })
  }, [state.leads, query, status, owner, sort, clientById])

  const totals = useMemo(
    () => ({
      count: rows.length,
      value: rows.reduce((s, l) => s + l.value, 0),
      weighted: rows.reduce((s, l) => s + (l.value * l.probability) / 100, 0),
    }),
    [rows],
  )

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: -1 }))

  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : '')

  return (
    <Page
      title="Lead-uri"
      subtitle={`${totals.count} rezultate · ${money(totals.value)} valoare totală · ${money(Math.round(totals.weighted))} ponderat`}
      actions={
        can('leads.write') && (
          <button className="btn btn-primary" onClick={() => setEditing('new')}>
            <IconPlus size={15} />
            Lead nou
          </button>
        )
      }
    >
      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută lead sau client…" />
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          style={{ width: 'auto' }}
        >
          <option value="open">Doar active</option>
          <option value="all">Toate</option>
          <option value="nou">Nou</option>
          <option value="contactat">Contactat</option>
          <option value="oferta">Ofertă</option>
          <option value="castigat">Câștigat</option>
          <option value="pierdut">Pierdut</option>
        </Select>
        <Select value={owner} onChange={(e) => setOwner(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">Toți responsabilii</option>
          {state.users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </Select>
        <Link to="/pipeline" className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>
          Vizualizare pipeline
        </Link>
      </div>

      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState
            icon={IconLeads}
            title="Niciun lead găsit"
            description="Schimbă filtrele sau creează un lead nou."
          />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Serviciu</th>
                  <th>Sursă</th>
                  <th>Etapă</th>
                  <th>Responsabil</th>
                  <th className="right sortable" onClick={() => toggleSort('value')}>
                    Valoare{arrow('value')}
                  </th>
                  <th className="right sortable" onClick={() => toggleSort('probability')}>
                    Șanse{arrow('probability')}
                  </th>
                  <th className="sortable" onClick={() => toggleSort('expectedCloseAt')}>
                    Închidere{arrow('expectedCloseAt')}
                  </th>
                  {can('leads.write') && <th />}
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => {
                  const client = clientById(lead.clientId)
                  return (
                    <tr key={lead.id}>
                      <td>
                        <span className="cell-strong" style={{ display: 'block' }}>
                          {lead.title}
                        </span>
                        {client && (
                          <Link to={`/clienti/${client.id}`} className="small muted">
                            {client.name}
                          </Link>
                        )}
                      </td>
                      <td className="cell-muted">{SERVICE_LABEL[lead.service]}</td>
                      <td>
                        <Badge>{SOURCE_LABEL[lead.source]}</Badge>
                      </td>
                      <td>
                        <StageBadge status={lead.status} />
                      </td>
                      <td>
                        <Avatar user={userById(lead.ownerId)} size="sm" />
                      </td>
                      <td className="right num cell-strong">{money(lead.value)}</td>
                      <td className="right num cell-muted">{percent(lead.probability)}</td>
                      <td className="cell-muted small">{relative(lead.expectedCloseAt)}</td>
                      {can('leads.write') && (
                        <td className="right">
                          <span className="row" style={{ justifyContent: 'flex-end', gap: 2 }}>
                            <button
                              className="btn-icon"
                              aria-label="Editează"
                              onClick={() => setEditing(lead)}
                            >
                              <IconEdit size={15} />
                            </button>
                            <button
                              className="btn-icon"
                              aria-label="Șterge"
                              onClick={() => setRemoving(lead)}
                            >
                              <IconTrash size={15} />
                            </button>
                          </span>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {editing && (
        <LeadForm lead={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />
      )}

      {removing && (
        <ConfirmDialog
          title="Șterge lead-ul"
          message={`Ștergi „${removing.title}”. Acțiunea nu poate fi anulată.`}
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            dispatch({ type: 'lead.remove', id: removing.id })
            setRemoving(null)
          }}
        />
      )}
    </Page>
  )
}
