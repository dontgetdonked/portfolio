import { useState } from 'react'
import { Field, Input, Modal, Select, Textarea } from '@/components/ui'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { addDays, money, toISODate } from '@/lib/format'
import {
  SERVICE_LABEL,
  SOURCE_LABEL,
  STAGE_LABEL,
  STAGES,
  type Lead,
  type LeadStatus,
  type ServiceType,
  type Source,
} from '@/types'

export function LeadForm({
  lead,
  defaultStatus,
  onClose,
}: {
  lead?: Lead | null
  defaultStatus?: LeadStatus
  onClose: () => void
}) {
  const { state, currentUser, dispatch } = useStore()

  const [form, setForm] = useState({
    title: lead?.title ?? '',
    clientId: lead?.clientId ?? state.clients[0]?.id ?? '',
    status: lead?.status ?? defaultStatus ?? ('nou' as LeadStatus),
    value: lead?.value ?? 0,
    service: lead?.service ?? ('renovari' as ServiceType),
    source: lead?.source ?? ('website' as Source),
    ownerId: lead?.ownerId ?? currentUser.id,
    probability: lead?.probability ?? 20,
    expectedCloseAt: toISODate(new Date(lead?.expectedCloseAt ?? addDays(new Date(), 30))),
    lostReason: lead?.lostReason ?? '',
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const valid = form.title.trim().length > 2 && form.clientId && form.value >= 0

  const submit = () => {
    if (!valid) return
    const nowIso = new Date().toISOString()
    const payload = {
      title: form.title.trim(),
      clientId: form.clientId,
      status: form.status,
      value: Number(form.value) || 0,
      service: form.service,
      source: form.source,
      ownerId: form.ownerId,
      probability: form.status === 'castigat' ? 100 : form.status === 'pierdut' ? 0 : Number(form.probability),
      expectedCloseAt: new Date(form.expectedCloseAt).toISOString(),
      lostReason: form.status === 'pierdut' ? form.lostReason : undefined,
    }

    if (lead) {
      dispatch({ type: 'lead.update', id: lead.id, patch: payload })
    } else {
      dispatch({
        type: 'lead.add',
        lead: { ...payload, id: uid('l'), createdAt: nowIso, updatedAt: nowIso },
      })
    }
    onClose()
  }

  return (
    <Modal
      title={lead ? 'Editează lead-ul' : 'Lead nou'}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            {lead ? 'Salvează' : 'Creează lead'}
          </button>
        </>
      }
    >
      <Field label="Titlu lucrare *">
        <Input
          autoFocus
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="ex. Renovare integrală 8 apartamente"
        />
      </Field>

      <div className="form-row">
        <Field label="Client *">
          <Select value={form.clientId} onChange={(e) => set('clientId', e.target.value)}>
            {state.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tip serviciu">
          <Select
            value={form.service}
            onChange={(e) => set('service', e.target.value as ServiceType)}
          >
            {Object.entries(SERVICE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Valoare estimată (lei)" hint={money(Number(form.value) || 0)}>
          <Input
            type="number"
            min={0}
            step={1000}
            value={form.value}
            onChange={(e) => set('value', Number(e.target.value))}
          />
        </Field>
        <Field label="Sursă">
          <Select value={form.source} onChange={(e) => set('source', e.target.value as Source)}>
            {Object.entries(SOURCE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Etapă">
          <Select
            value={form.status}
            onChange={(e) => set('status', e.target.value as LeadStatus)}
          >
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {STAGE_LABEL[stage]}
              </option>
            ))}
            <option value="pierdut">Pierdut</option>
          </Select>
        </Field>
        <Field label="Responsabil">
          <Select value={form.ownerId} onChange={(e) => set('ownerId', e.target.value)}>
            {state.users
              .filter((u) => u.active)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field
          label="Probabilitate de câștig"
          hint={`${form.probability}%`}
        >
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={form.probability}
            disabled={form.status === 'castigat' || form.status === 'pierdut'}
            onChange={(e) => set('probability', Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </Field>
        <Field label="Închidere estimată">
          <Input
            type="date"
            value={form.expectedCloseAt}
            onChange={(e) => set('expectedCloseAt', e.target.value)}
          />
        </Field>
      </div>

      {form.status === 'pierdut' && (
        <Field label="Motivul pierderii">
          <Textarea
            value={form.lostReason}
            onChange={(e) => set('lostReason', e.target.value)}
            placeholder="ex. Preț mai mic la concurență"
            style={{ minHeight: 70 }}
          />
        </Field>
      )}
    </Modal>
  )
}
