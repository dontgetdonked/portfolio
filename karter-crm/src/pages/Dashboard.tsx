import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '@/components/layout'
import { Card, Avatar, EmptyState, Badge } from '@/components/ui'
import { AreaChart, BarChart, DonutChart, FunnelChart, type Slice } from '@/components/charts'
import { DueDate, EVENT_COLOR, EVENT_ICON, STAGE_COLOR } from '@/components/shared'
import { useStore } from '@/store/store'
import {
  IconAlert,
  IconArrowRight,
  IconCheck,
  IconInbox,
  IconInvoices,
  IconMoney,
  IconTarget,
  IconTasks,
  IconTrendDown,
  IconTrendUp,
  IconUser,
  type IconProps,
} from '@/components/icons'
import { compactMoney, docTotals, isSameDay, money, percent, relative, time } from '@/lib/format'
import { SOURCE_LABEL, STAGES, STAGE_LABEL, type Source } from '@/types'

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
]

export default function Dashboard() {
  const { state, currentUser, userById, clientById } = useStore()
  const now = new Date()

  const metrics = useMemo(() => {
    const won = state.leads.filter((l) => l.status === 'castigat')
    const lost = state.leads.filter((l) => l.status === 'pierdut')
    const open = state.leads.filter((l) => l.status !== 'castigat' && l.status !== 'pierdut')

    const pipelineValue = open.reduce((sum, l) => sum + l.value, 0)
    const weighted = open.reduce((sum, l) => sum + (l.value * l.probability) / 100, 0)

    const last30 = won.filter(
      (l) => new Date(l.updatedAt).getTime() > now.getTime() - 30 * 86_400_000,
    )
    const prev30 = won.filter((l) => {
      const t = new Date(l.updatedAt).getTime()
      return t <= now.getTime() - 30 * 86_400_000 && t > now.getTime() - 60 * 86_400_000
    })
    const wonNow = last30.reduce((s, l) => s + l.value, 0)
    const wonPrev = prev30.reduce((s, l) => s + l.value, 0)
    const delta = wonPrev === 0 ? (wonNow > 0 ? 100 : 0) : ((wonNow - wonPrev) / wonPrev) * 100

    const closed = won.length + lost.length
    const conversion = closed === 0 ? 0 : (won.length / closed) * 100

    const overdueInvoices = state.documents.filter(
      (d) => d.kind === 'factura' && d.status === 'restant',
    )
    const overdueValue = overdueInvoices.reduce(
      (sum, d) => sum + docTotals(d.lines, d.vatRate).total,
      0,
    )

    return { won, lost, open, pipelineValue, weighted, wonNow, delta, conversion, overdueInvoices, overdueValue }
  }, [state.leads, state.documents])

  const monthly = useMemo(() => {
    const buckets: { label: string; value: number }[] = []
    for (let i = 5; i >= 0; i -= 1) {
      const ref = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const value = state.leads
        .filter((l) => l.status === 'castigat')
        .filter((l) => {
          const d = new Date(l.updatedAt)
          return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()
        })
        .reduce((sum, l) => sum + l.value, 0)
      buckets.push({
        label: ref.toLocaleDateString('ro-RO', { month: 'short' }),
        value,
      })
    }
    return buckets
  }, [state.leads])

  const funnel = STAGES.map((stage) => {
    const items = state.leads.filter((l) => l.status === stage)
    return {
      label: STAGE_LABEL[stage],
      count: items.length,
      value: items.reduce((s, l) => s + l.value, 0),
      color: STAGE_COLOR[stage],
    }
  })

  const bySource: Slice[] = useMemo(() => {
    const totals = new Map<Source, number>()
    state.leads.forEach((l) => totals.set(l.source, (totals.get(l.source) ?? 0) + 1))
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([source, count], i) => ({
        label: SOURCE_LABEL[source],
        value: count,
        color: CHART_COLORS[i % CHART_COLORS.length]!,
      }))
  }, [state.leads])

  const byOwner = useMemo(
    () =>
      state.users
        .filter((u) => u.active)
        .map((user) => ({
          label: user.initials,
          value: state.leads
            .filter((l) => l.status === 'castigat' && l.ownerId === user.id)
            .reduce((s, l) => s + l.value, 0),
          color: user.color,
        }))
        .sort((a, b) => b.value - a.value),
    [state.users, state.leads],
  )

  const myTasks = state.tasks
    .filter((t) => !t.done && t.assigneeId === currentUser.id)
    .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt))
    .slice(0, 5)

  const todayEvents = state.events
    .filter((e) => isSameDay(e.startAt, now))
    .sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt))

  return (
    <Page
      title={`Bună, ${currentUser.name.split(' ')[0]}`}
      subtitle={`${metrics.open.length} lead-uri active · ${myTasks.length} task-uri deschise pentru tine`}
      actions={
        <Link to="/pipeline" className="btn btn-primary">
          Deschide pipeline
          <IconArrowRight size={15} />
        </Link>
      }
    >
      <div className="grid grid-kpi">
        <Kpi
          label="Încasat ultimele 30 zile"
          value={money(metrics.wonNow)}
          icon={IconMoney}
          trend={metrics.delta}
          footNote="față de perioada anterioară"
        />
        <Kpi
          label="Valoare pipeline"
          value={money(metrics.pipelineValue)}
          icon={IconTarget}
          footNote={`ponderat: ${money(Math.round(metrics.weighted))}`}
        />
        <Kpi
          label="Rată de conversie"
          value={percent(metrics.conversion, 1)}
          icon={IconCheck}
          footNote={`${metrics.won.length} câștigate · ${metrics.lost.length} pierdute`}
        />
        <Kpi
          label="Facturi restante"
          value={money(metrics.overdueValue)}
          icon={IconAlert}
          danger={metrics.overdueInvoices.length > 0}
          footNote={`${metrics.overdueInvoices.length} documente depășite`}
        />
      </div>

      <div className="split-main">
        <Card
          title="Valoare contracte câștigate"
          action={<span className="small muted">ultimele 6 luni</span>}
        >
          <AreaChart data={monthly} />
        </Card>

        <Card title="Pâlnie de vânzări">
          <FunnelChart stages={funnel} />
        </Card>
      </div>

      <div className="grid grid-3">
        <Card title="Lead-uri după sursă">
          <div className="row" style={{ gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <DonutChart
              data={bySource}
              centerValue={String(state.leads.length)}
              centerLabel="lead-uri"
            />
            <div className="chart-legend" style={{ flexDirection: 'column', gap: 7 }}>
              {bySource.map((slice) => (
                <span key={slice.label} className="legend-item">
                  <span className="legend-swatch" style={{ background: slice.color }} />
                  {slice.label}
                  <span className="muted num">· {slice.value}</span>
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Câștiguri pe agent" action={<span className="small muted">lei</span>}>
          <BarChart data={byOwner} formatValue={(v) => compactMoney(v)} />
        </Card>

        <Card title="Agenda de azi" padded={false}>
          {todayEvents.length === 0 ? (
            <EmptyState icon={IconInbox} title="Nicio programare azi" description="Ziua e liberă." />
          ) : (
            <div style={{ padding: 8 }}>
              {todayEvents.map((event) => {
                const Icon = EVENT_ICON[event.kind]
                const client = clientById(event.clientId)
                return (
                  <div key={event.id} className="row" style={{ padding: '9px 10px', gap: 11 }}>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'var(--surface-2)',
                        color: EVENT_COLOR[event.kind],
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="grow" style={{ minWidth: 0 }}>
                      <span style={{ fontWeight: 550, display: 'block' }} className="truncate">
                        {event.title}
                      </span>
                      <span className="small muted truncate" style={{ display: 'block' }}>
                        {client?.name ?? event.location}
                      </span>
                    </span>
                    <span className="small muted num">{time(event.startAt)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      <div className="split-main">
        <Card
          title="Task-urile mele"
          padded={false}
          action={
            <Link to="/task-uri" className="btn btn-sm btn-ghost">
              Vezi toate
              <IconArrowRight size={13} />
            </Link>
          }
        >
          {myTasks.length === 0 ? (
            <EmptyState
              icon={IconTasks}
              title="Niciun task deschis"
              description="Totul e bifat. Verifică pipeline-ul pentru pașii următori."
            />
          ) : (
            myTasks.map((task) => {
              const client = clientById(task.clientId)
              return (
                <div key={task.id} className="task-row">
                  <span
                    className="checkbox"
                    style={{ pointerEvents: 'none' }}
                    data-checked="false"
                    aria-hidden="true"
                  />
                  <span className="task-main">
                    <span className="task-title">{task.title}</span>
                    <span className="task-meta">
                      <DueDate iso={task.dueAt} done={task.done} />
                      {client && (
                        <span className="meta-chip">
                          <IconUser size={13} />
                          {client.name}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              )
            })
          )}
        </Card>

        <Card title="Activitate recentă">
          <div className="stack" style={{ gap: 14 }}>
            {state.activity.slice(0, 8).map((entry) => {
              const user = userById(entry.userId)
              return (
                <div key={entry.id} className="row" style={{ alignItems: 'flex-start', gap: 10 }}>
                  <Avatar user={user} size="sm" />
                  <span className="grow small">
                    <strong style={{ fontWeight: 600 }}>{user?.name.split(' ')[0]}</strong>{' '}
                    <span className="muted">{entry.text}</span>
                    <span
                      className="small"
                      style={{ color: 'var(--text-3)', display: 'block', marginTop: 1 }}
                    >
                      {relative(entry.at)}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <Card title="Documente care necesită atenție" padded={false}>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Document</th>
                <th>Client</th>
                <th>Scadență</th>
                <th className="right">Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {state.documents
                .filter((d) => d.status === 'restant' || d.status === 'trimis')
                .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt))
                .slice(0, 5)
                .map((doc) => {
                  const overdue = doc.status === 'restant'
                  return (
                    <tr key={doc.id}>
                      <td className="cell-strong">
                        <span className="row" style={{ gap: 8 }}>
                          <IconInvoices size={15} />
                          {doc.number}
                        </span>
                      </td>
                      <td className="cell-muted">{clientById(doc.clientId)?.name}</td>
                      <td className={overdue ? 'overdue' : 'cell-muted'}>{relative(doc.dueAt)}</td>
                      <td className="right num cell-strong">
                        {money(docTotals(doc.lines, doc.vatRate).total)}
                      </td>
                      <td className="right">
                        <Badge tone={overdue ? 'danger' : 'info'}>
                          {overdue ? 'Restant' : 'În așteptare'}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  )
}

function Kpi({
  label,
  value,
  icon: Icon,
  trend,
  footNote,
  danger,
}: {
  label: string
  value: string
  icon: (props: IconProps) => JSX.Element
  trend?: number
  footNote?: string
  danger?: boolean
}) {
  return (
    <div className="card kpi">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span
          className="kpi-icon"
          style={
            danger ? { background: 'var(--danger-soft)', color: 'var(--danger)' } : undefined
          }
        >
          <Icon size={16} />
        </span>
      </div>
      <span className="kpi-value">{value}</span>
      <span className="kpi-foot">
        {trend !== undefined && (
          <span className={trend >= 0 ? 'trend trend-up' : 'trend trend-down'}>
            {trend >= 0 ? <IconTrendUp size={13} /> : <IconTrendDown size={13} />}
            {percent(Math.abs(trend), 0)}
          </span>
        )}
        {footNote}
      </span>
    </div>
  )
}
