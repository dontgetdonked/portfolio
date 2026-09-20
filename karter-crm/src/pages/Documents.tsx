import { useMemo, useState } from 'react'
import { Page } from '@/components/layout'
import {
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  Input,
  Modal,
  SearchInput,
  Select,
  Tabs,
} from '@/components/ui'
import { DocStatusBadge } from '@/components/shared'
import {
  IconInvoices,
  IconPlus,
  IconTrash,
  IconMoney,
  IconAlert,
  IconCheck,
} from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { addDays, date, docTotals, money, moneyExact, relative, toISODate } from '@/lib/format'
import {
  DOC_STATUS_LABEL,
  type DocKind,
  type DocLine,
  type DocStatus,
  type Document,
} from '@/types'

type Scope = 'all' | 'oferta' | 'factura'

export default function Documents() {
  const { state, can, clientById, dispatch } = useStore()

  const [scope, setScope] = useState<Scope>('all')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | DocStatus>('all')
  const [open, setOpen] = useState<Document | null>(null)
  const [creating, setCreating] = useState(false)
  const [removing, setRemoving] = useState<Document | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.documents
      .filter((doc) => {
        if (scope !== 'all' && doc.kind !== scope) return false
        if (status !== 'all' && doc.status !== status) return false
        if (!q) return true
        const client = clientById(doc.clientId)?.name ?? ''
        return `${doc.number} ${client} ${doc.notes}`.toLowerCase().includes(q)
      })
      .sort((a, b) => +new Date(b.issuedAt) - +new Date(a.issuedAt))
  }, [state.documents, scope, query, status, clientById])

  const stats = useMemo(() => {
    const invoices = state.documents.filter((d) => d.kind === 'factura')
    const total = (docs: Document[]) =>
      docs.reduce((sum, d) => sum + docTotals(d.lines, d.vatRate).total, 0)
    return {
      paid: total(invoices.filter((d) => d.status === 'platit')),
      pending: total(invoices.filter((d) => d.status === 'trimis')),
      overdue: total(invoices.filter((d) => d.status === 'restant')),
      quoted: total(state.documents.filter((d) => d.kind === 'oferta' && d.status === 'trimis')),
    }
  }, [state.documents])

  return (
    <Page
      title="Facturi și oferte"
      subtitle={`${state.documents.length} documente emise`}
      actions={
        can('invoices.write') && (
          <button className="btn btn-primary" onClick={() => setCreating(true)}>
            <IconPlus size={15} />
            Document nou
          </button>
        )
      }
    >
      <div className="grid grid-kpi">
        <MiniStat label="Încasat" value={money(stats.paid)} tone="success" icon={<IconCheck size={16} />} />
        <MiniStat label="În așteptare" value={money(stats.pending)} tone="info" icon={<IconMoney size={16} />} />
        <MiniStat label="Restant" value={money(stats.overdue)} tone="danger" icon={<IconAlert size={16} />} />
        <MiniStat label="Oferte trimise" value={money(stats.quoted)} tone="accent" icon={<IconInvoices size={16} />} />
      </div>

      <Tabs<Scope>
        active={scope}
        onChange={setScope}
        tabs={[
          { id: 'all', label: 'Toate', count: state.documents.length },
          {
            id: 'oferta',
            label: 'Oferte',
            count: state.documents.filter((d) => d.kind === 'oferta').length,
          },
          {
            id: 'factura',
            label: 'Facturi',
            count: state.documents.filter((d) => d.kind === 'factura').length,
          },
        ]}
      />

      <div className="toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder="Caută după număr sau client…" />
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toate statusurile</option>
          {Object.entries(DOC_STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState icon={IconInvoices} title="Niciun document găsit" />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Număr</th>
                  <th>Client</th>
                  <th>Tip</th>
                  <th>Status</th>
                  <th>Emis</th>
                  <th>Scadent</th>
                  <th className="right">Total cu TVA</th>
                  {can('invoices.delete') && <th />}
                </tr>
              </thead>
              <tbody>
                {rows.map((doc) => {
                  const totals = docTotals(doc.lines, doc.vatRate)
                  const overdue = doc.status === 'restant'
                  return (
                    <tr key={doc.id} className="clickable" onClick={() => setOpen(doc)}>
                      <td className="cell-strong num">{doc.number}</td>
                      <td className="cell-muted">{clientById(doc.clientId)?.name}</td>
                      <td className="cell-muted">{doc.kind === 'factura' ? 'Factură' : 'Ofertă'}</td>
                      <td>
                        <DocStatusBadge status={doc.status} />
                      </td>
                      <td className="cell-muted small">{date(doc.issuedAt)}</td>
                      <td className={overdue ? 'overdue small' : 'cell-muted small'}>
                        {relative(doc.dueAt)}
                      </td>
                      <td className="right num cell-strong">{money(totals.total)}</td>
                      {can('invoices.delete') && (
                        <td className="right">
                          <button
                            className="btn-icon"
                            aria-label="Șterge documentul"
                            onClick={(e) => {
                              e.stopPropagation()
                              setRemoving(doc)
                            }}
                          >
                            <IconTrash size={15} />
                          </button>
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

      {open && <DocumentView doc={open} onClose={() => setOpen(null)} />}
      {creating && <DocumentForm onClose={() => setCreating(false)} />}
      {removing && (
        <ConfirmDialog
          title="Șterge documentul"
          message={`Ștergi ${removing.number}. Acțiunea nu poate fi anulată.`}
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            dispatch({ type: 'document.remove', id: removing.id })
            setRemoving(null)
          }}
        />
      )}
    </Page>
  )
}

function MiniStat({
  label,
  value,
  tone,
  icon,
}: {
  label: string
  value: string
  tone: 'success' | 'info' | 'danger' | 'accent'
  icon: React.ReactNode
}) {
  const colors: Record<typeof tone, { bg: string; fg: string }> = {
    success: { bg: 'var(--success-soft)', fg: 'var(--success)' },
    info: { bg: 'var(--info-soft)', fg: 'var(--info)' },
    danger: { bg: 'var(--danger-soft)', fg: 'var(--danger)' },
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-text)' },
  }
  return (
    <div className="card kpi">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-icon" style={{ background: colors[tone].bg, color: colors[tone].fg }}>
          {icon}
        </span>
      </div>
      <span className="kpi-value" style={{ fontSize: 21 }}>
        {value}
      </span>
    </div>
  )
}

function DocumentView({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const { can, clientById, leadById, dispatch } = useStore()
  const client = clientById(doc.clientId)
  const lead = leadById(doc.leadId)
  const totals = docTotals(doc.lines, doc.vatRate)

  return (
    <Modal
      title={`${doc.kind === 'factura' ? 'Factura' : 'Oferta'} ${doc.number}`}
      onClose={onClose}
      wide
      footer={
        <>
          {can('invoices.write') && (
            <Select
              value={doc.status}
              onChange={(e) =>
                dispatch({
                  type: 'document.update',
                  id: doc.id,
                  patch: { status: e.target.value as DocStatus },
                })
              }
              style={{ width: 'auto', marginRight: 'auto' }}
            >
              {Object.entries(DOC_STATUS_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
          <button className="btn" onClick={onClose}>
            Închide
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            Tipărește
          </button>
        </>
      }
    >
      <div className="row-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="fact-label">Client</div>
          <div className="fact-value">{client?.name}</div>
          <div className="small muted">
            {client?.address}, {client?.city}
          </div>
          {client?.cui && <div className="small muted num">CUI {client.cui}</div>}
        </div>
        <div style={{ textAlign: 'right' }}>
          <DocStatusBadge status={doc.status} />
          <div className="small muted" style={{ marginTop: 6 }}>
            Emis: {date(doc.issuedAt)}
          </div>
          <div className="small muted">Scadent: {date(doc.dueAt)}</div>
        </div>
      </div>

      {lead && (
        <div className="small muted">
          Lucrare asociată: <strong style={{ fontWeight: 600 }}>{lead.title}</strong>
        </div>
      )}

      <div className="table-wrap card" style={{ overflow: 'hidden' }}>
        <table className="data">
          <thead>
            <tr>
              <th>Descriere</th>
              <th className="right">Cant.</th>
              <th>UM</th>
              <th className="right">Preț unitar</th>
              <th className="right">Valoare</th>
            </tr>
          </thead>
          <tbody>
            {doc.lines.map((line) => (
              <tr key={line.id}>
                <td className="cell-strong">{line.description}</td>
                <td className="right num">{line.qty}</td>
                <td className="cell-muted">{line.unit}</td>
                <td className="right num cell-muted">{moneyExact(line.unitPrice)}</td>
                <td className="right num cell-strong">{moneyExact(line.qty * line.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginLeft: 'auto', minWidth: 250 }} className="stack">
        <div className="row-between small">
          <span className="muted">Subtotal</span>
          <span className="num">{moneyExact(totals.net)}</span>
        </div>
        <div className="row-between small">
          <span className="muted">TVA {doc.vatRate}%</span>
          <span className="num">{moneyExact(totals.vat)}</span>
        </div>
        <div
          className="row-between"
          style={{ fontWeight: 700, fontSize: 16, paddingTop: 8, borderTop: '1px solid var(--border)' }}
        >
          <span>Total</span>
          <span className="num">{moneyExact(totals.total)}</span>
        </div>
      </div>

      {doc.notes && (
        <div className="small muted" style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          {doc.notes}
        </div>
      )}
    </Modal>
  )
}

function DocumentForm({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useStore()
  const [kind, setKind] = useState<DocKind>('oferta')
  const [clientId, setClientId] = useState(state.clients[0]?.id ?? '')
  const [leadId, setLeadId] = useState('')
  const [dueAt, setDueAt] = useState(toISODate(addDays(new Date(), 30)))
  const [vatRate, setVatRate] = useState(19)
  const [notes, setNotes] = useState('')
  const [lines, setLines] = useState<DocLine[]>([
    { id: uid('dl'), description: '', qty: 1, unit: 'buc', unitPrice: 0 },
  ])

  const totals = docTotals(lines, vatRate)
  const valid = clientId && lines.some((l) => l.description.trim() && l.unitPrice > 0)

  const updateLine = (id: string, patch: Partial<DocLine>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  const nextNumber = () => {
    const year = new Date().getFullYear()
    const same = state.documents.filter((d) => d.kind === kind)
    const seq = same.length + 1
    return kind === 'factura' ? `F-${2400 + seq}` : `OF-${year}-${100 + seq}`
  }

  const submit = () => {
    if (!valid) return
    const doc: Document = {
      id: uid('d'),
      number: nextNumber(),
      kind,
      status: 'draft',
      clientId,
      leadId: leadId || undefined,
      issuedAt: new Date().toISOString(),
      dueAt: new Date(dueAt).toISOString(),
      lines: lines.filter((l) => l.description.trim()),
      vatRate,
      notes: notes.trim(),
    }
    dispatch({ type: 'document.add', document: doc })
    onClose()
  }

  const leadsForClient = state.leads.filter((l) => l.clientId === clientId)

  return (
    <Modal
      title="Document nou"
      onClose={onClose}
      wide
      footer={
        <>
          <span className="grow num" style={{ fontWeight: 650 }}>
            Total: {moneyExact(totals.total)}
          </span>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Creează {kind === 'factura' ? 'factura' : 'oferta'}
          </button>
        </>
      }
    >
      <div className="form-row">
        <Field label="Tip document">
          <Select value={kind} onChange={(e) => setKind(e.target.value as DocKind)}>
            <option value="oferta">Ofertă</option>
            <option value="factura">Factură</option>
          </Select>
        </Field>
        <Field label="Client *">
          <Select
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value)
              setLeadId('')
            }}
          >
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Lead asociat">
          <Select value={leadId} onChange={(e) => setLeadId(e.target.value)}>
            <option value="">Fără lead</option>
            {leadsForClient.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Scadență">
          <Input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} />
        </Field>
      </div>

      <div className="stack" style={{ gap: 9 }}>
        <span className="field-label">Linii document</span>
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,3fr) 70px 70px 110px 32px',
              gap: 7,
              alignItems: 'center',
            }}
          >
            <Input
              placeholder="Descriere lucrare"
              value={line.description}
              onChange={(e) => updateLine(line.id, { description: e.target.value })}
            />
            <Input
              type="number"
              min={0}
              value={line.qty}
              onChange={(e) => updateLine(line.id, { qty: Number(e.target.value) })}
            />
            <Input
              placeholder="UM"
              value={line.unit}
              onChange={(e) => updateLine(line.id, { unit: e.target.value })}
            />
            <Input
              type="number"
              min={0}
              step={10}
              value={line.unitPrice}
              onChange={(e) => updateLine(line.id, { unitPrice: Number(e.target.value) })}
            />
            <button
              className="btn-icon"
              aria-label="Șterge linia"
              disabled={lines.length === 1}
              onClick={() => setLines((ls) => ls.filter((l) => l.id !== line.id))}
            >
              <IconTrash size={14} />
            </button>
          </div>
        ))}
        <button
          className="btn btn-sm"
          style={{ alignSelf: 'flex-start' }}
          onClick={() =>
            setLines((ls) => [
              ...ls,
              { id: uid('dl'), description: '', qty: 1, unit: 'buc', unitPrice: 0 },
            ])
          }
        >
          <IconPlus size={14} />
          Adaugă linie
        </button>
      </div>

      <div className="form-row">
        <Field label="Cotă TVA (%)">
          <Input
            type="number"
            min={0}
            max={30}
            value={vatRate}
            onChange={(e) => setVatRate(Number(e.target.value))}
          />
        </Field>
        <Field label="Observații">
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="ex. Valabilitate 30 de zile"
          />
        </Field>
      </div>
    </Modal>
  )
}
