import { useMemo, useState } from 'react'
import { Page } from '@/components/layout'
import {
  AvatarStack,
  Card,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
} from '@/components/ui'
import { EVENT_COLOR, EVENT_ICON } from '@/components/shared'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconPlus,
  IconTrash,
} from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { MONTHS, WEEKDAYS, isSameDay, startOfDay, time } from '@/lib/format'
import { EVENT_LABEL, type CalendarEvent, type EventKind } from '@/types'

export default function Calendar() {
  const { state, can, clientById, userById, dispatch } = useStore()
  const today = new Date()

  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState<Date>(startOfDay(today))
  const [creating, setCreating] = useState(false)
  const [kindFilter, setKindFilter] = useState<'all' | EventKind>('all')

  const events = useMemo(
    () =>
      state.events
        .filter((e) => kindFilter === 'all' || e.kind === kindFilter)
        .sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt)),
    [state.events, kindFilter],
  )

  /** Six-row grid starting on the Monday on or before the 1st. */
  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7
    const start = new Date(first)
    start.setDate(first.getDate() - offset)
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [cursor])

  const eventsOn = (day: Date) => events.filter((e) => isSameDay(e.startAt, day))
  const selectedEvents = eventsOn(selected)

  const shift = (months: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + months, 1))

  return (
    <Page
      title="Calendar"
      subtitle={`${events.length} programări în agendă`}
      actions={
        can('tasks.write') && (
          <button className="btn btn-primary" onClick={() => setCreating(true)}>
            <IconPlus size={15} />
            Programare nouă
          </button>
        )
      }
    >
      <div className="split-main">
        <Card
          padded={false}
          title={
            <span className="row" style={{ gap: 10 }}>
              <button className="btn-icon" onClick={() => shift(-1)} aria-label="Luna anterioară">
                <IconChevronLeft size={17} />
              </button>
              <span style={{ minWidth: 150, textAlign: 'center' }}>
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </span>
              <button className="btn-icon" onClick={() => shift(1)} aria-label="Luna următoare">
                <IconChevronRight size={17} />
              </button>
            </span>
          }
          action={
            <span className="row" style={{ gap: 8 }}>
              <Select
                value={kindFilter}
                onChange={(e) => setKindFilter(e.target.value as typeof kindFilter)}
                style={{ width: 'auto', padding: '5px 28px 5px 9px', fontSize: 12 }}
              >
                <option value="all">Toate tipurile</option>
                {Object.entries(EVENT_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
              <button
                className="btn btn-sm"
                onClick={() => {
                  setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
                  setSelected(startOfDay(today))
                }}
              >
                Azi
              </button>
            </span>
          }
        >
          <div className="cal-grid">
            {WEEKDAYS.map((day) => (
              <div key={day} className="cal-dow">
                {day}
              </div>
            ))}

            {cells.map((day) => {
              const dayEvents = eventsOn(day)
              const outside = day.getMonth() !== cursor.getMonth()
              const classes = [
                'cal-cell',
                outside ? 'outside' : '',
                isSameDay(day, today) ? 'today' : '',
                isSameDay(day, selected) ? 'selected' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={day.toISOString()}
                  className={classes}
                  onClick={() => setSelected(startOfDay(day))}
                >
                  <span className="cal-date">{day.getDate()}</span>
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className="cal-event"
                      style={{
                        color: EVENT_COLOR[event.kind],
                        background: 'var(--surface-2)',
                      }}
                      title={event.title}
                    >
                      <span style={{ color: 'var(--text-2)' }}>{time(event.startAt)}</span>{' '}
                      {event.title}
                    </span>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="cal-more">+{dayEvents.length - 3} altele</span>
                  )}
                </button>
              )
            })}
          </div>
        </Card>

        <Card
          title={selected.toLocaleDateString('ro-RO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
          padded={false}
        >
          {selectedEvents.length === 0 ? (
            <EmptyState
              icon={IconCalendar}
              title="Zi liberă"
              description="Nicio programare pentru această zi."
            />
          ) : (
            <div style={{ padding: 12 }} className="stack">
              {selectedEvents.map((event) => {
                const Icon = EVENT_ICON[event.kind]
                const client = clientById(event.clientId)
                const attendees = event.attendeeIds
                  .map((id) => userById(id))
                  .filter((u): u is NonNullable<typeof u> => Boolean(u))
                const end = new Date(
                  new Date(event.startAt).getTime() + event.durationMin * 60_000,
                )
                return (
                  <div
                    key={event.id}
                    style={{
                      padding: 12,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      borderLeft: `3px solid ${EVENT_COLOR[event.kind]}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 7,
                    }}
                  >
                    <div className="row-between">
                      <span className="row" style={{ gap: 7, color: EVENT_COLOR[event.kind] }}>
                        <Icon size={15} />
                        <span className="small" style={{ fontWeight: 650 }}>
                          {EVENT_LABEL[event.kind]}
                        </span>
                      </span>
                      <span className="small muted num">
                        {time(event.startAt)}–{time(end.toISOString())}
                      </span>
                    </div>

                    <span style={{ fontWeight: 600 }}>{event.title}</span>

                    {client && <span className="small muted">{client.name}</span>}

                    <span className="small muted meta-chip">
                      <IconMapPin size={13} />
                      {event.location}
                    </span>

                    <div className="row-between" style={{ marginTop: 2 }}>
                      <AvatarStack users={attendees} />
                      {can('tasks.write') && (
                        <button
                          className="btn-icon"
                          aria-label="Șterge programarea"
                          onClick={() => dispatch({ type: 'event.remove', id: event.id })}
                        >
                          <IconTrash size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      {creating && <EventForm day={selected} onClose={() => setCreating(false)} />}
    </Page>
  )
}

function EventForm({ day, onClose }: { day: Date; onClose: () => void }) {
  const { state, currentUser, dispatch } = useStore()
  const start = new Date(day)
  start.setHours(10, 0, 0, 0)

  const [form, setForm] = useState({
    title: '',
    kind: 'vizita' as EventKind,
    startAt: toLocalInput(start),
    durationMin: 60,
    clientId: '',
    location: '',
    attendeeIds: [currentUser.id],
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const valid = form.title.trim().length > 2

  const submit = () => {
    if (!valid) return
    const event: CalendarEvent = {
      id: uid('e'),
      title: form.title.trim(),
      kind: form.kind,
      startAt: new Date(form.startAt).toISOString(),
      durationMin: Number(form.durationMin) || 60,
      clientId: form.clientId || undefined,
      attendeeIds: form.attendeeIds,
      location: form.location.trim() || 'Nespecificat',
    }
    dispatch({ type: 'event.add', event })
    onClose()
  }

  return (
    <Modal
      title="Programare nouă"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            Adaugă în calendar
          </button>
        </>
      }
    >
      <Field label="Titlu *">
        <Input
          autoFocus
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="ex. Măsurători acoperiș"
        />
      </Field>

      <div className="form-row">
        <Field label="Tip">
          <Select value={form.kind} onChange={(e) => set('kind', e.target.value as EventKind)}>
            {Object.entries(EVENT_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Durată (minute)">
          <Input
            type="number"
            min={15}
            step={15}
            value={form.durationMin}
            onChange={(e) => set('durationMin', Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="form-row">
        <Field label="Început">
          <Input
            type="datetime-local"
            value={form.startAt}
            onChange={(e) => set('startAt', e.target.value)}
          />
        </Field>
        <Field label="Client">
          <Select value={form.clientId} onChange={(e) => set('clientId', e.target.value)}>
            <option value="">Fără client</option>
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Locație">
        <Input
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="ex. Sinaia, Calea Codrului 3"
        />
      </Field>

      <Field label="Participanți">
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {state.users
            .filter((u) => u.active)
            .map((user) => {
              const on = form.attendeeIds.includes(user.id)
              return (
                <button
                  key={user.id}
                  className={on ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                  onClick={() =>
                    set(
                      'attendeeIds',
                      on
                        ? form.attendeeIds.filter((id) => id !== user.id)
                        : [...form.attendeeIds, user.id],
                    )
                  }
                >
                  {user.name.split(' ')[0]}
                </button>
              )
            })}
        </div>
      </Field>
    </Modal>
  )
}

function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
