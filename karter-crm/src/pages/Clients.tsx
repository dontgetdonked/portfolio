import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/layout'
import {
  Avatar,
  Badge,
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  Input,
  Modal,
  SearchInput,
  Select,
} from '@/components/ui'
import { IconBuilding, IconClients, IconPlus, IconTrash, IconUser } from '@/components/icons'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { date, initialsOf, money } from '@/lib/format'
import type { Client, ClientType } from '@/types'

type SortKey = 'name' | 'city' | 'value' | 'createdAt'

export default function Clients() {
  const { state, can, userById, dispatch } = useStore()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | ClientType>('all')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'name', dir: 1 })
  const [editing, setEditing] = useState<Client | 'new' | null>(null)
  const [removing, setRemoving] = useState<Client | null>(null)

  const valueByClient = useMemo(() => {
    const map = new Map<string, number>()
    state.leads.forEach((lead) => {
      map.set(lead.clientId, (map.get(lead.clientId) ?? 0) + lead.value)
    })
    return map
  }, [state.leads])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = state.clients.filter((client) => {
      if (typeFilter !== 'all' && client.type !== typeFilter) return false
      if (ownerFilter !== 'all' && client.ownerId !== ownerFilter) return false
      if (!q) return true
      return [client.name, client.contactPerson, client.email, client.city, client.phone]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })

    return filtered.sort((a, b) => {
      const dir = sort.dir
      switch (sort.key) {
        case 'value':
          return ((valueByClient.get(a.id) ?? 0) - (valueByClient.get(b.id) ?? 0)) * dir
        case 'createdAt':
          return (+new Date(a.createdAt) - +new Date(b.createdAt)) * dir
        case 'city':
          return a.city.localeCompare(b.city, 'ro') * dir
        default:
          return a.name.localeCompare(b.name, 'ro') * dir
      }
    })
  }, [state.clients, query, typeFilter, ownerFilter, sort, valueByClient])

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }))

  return (
    <Page
      title="Clienți"
      subtitle={`${state.clients.length} clienți în portofoliu`}
      actions={
        can('clients.write') && (
          <button className="btn btn-primary" onClick={() => setEditing('new')}>
            <IconPlus size={15} />
            Client nou
          </button>
        )
      }
    >
      <div className="toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Caută după nume, persoană de contact, oraș…"
        />
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as 'all' | ClientType)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toate tipurile</option>
          <option value="firma">Firme</option>
          <option value="persoana_fizica">Persoane fizice</option>
        </Select>
        <Select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="all">Toți responsabilii</option>
          {state.users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </Select>
      </div>

      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState
            icon={IconClients}
            title="Niciun client găsit"
            description="Schimbă filtrele sau adaugă un client nou."
          />
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => toggleSort('name')}>
                    Client {sort.key === 'name' && (sort.dir === 1 ? '↑' : '↓')}
                  </th>
                  <th>Contact</th>
                  <th className="sortable" onClick={() => toggleSort('city')}>
                    Oraș {sort.key === 'city' && (sort.dir === 1 ? '↑' : '↓')}
                  </th>
                  <th>Responsabil</th>
                  <th className="right sortable" onClick={() => toggleSort('value')}>
                    Valoare lead-uri {sort.key === 'value' && (sort.dir === 1 ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => toggleSort('createdAt')}>
                    Adăugat {sort.key === 'createdAt' && (sort.dir === 1 ? '↑' : '↓')}
                  </th>
                  {can('clients.write') && <th />}
                </tr>
              </thead>
              <tbody>
                {rows.map((client) => (
                  <tr
                    key={client.id}
                    className="clickable"
                    onClick={() => navigate(`/clienti/${client.id}`)}
                  >
                    <td>
                      <span className="row" style={{ gap: 10 }}>
                        <span
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border)',
                            display: 'grid',
                            placeItems: 'center',
                            color: 'var(--text-2)',
                            flexShrink: 0,
                          }}
                        >
                          {client.type === 'firma' ? <IconBuilding size={15} /> : <IconUser size={15} />}
                        </span>
                        <span>
                          <span className="cell-strong" style={{ display: 'block' }}>
                            {client.name}
                          </span>
                          <span className="small muted">
                            {client.type === 'firma' ? (client.cui ?? 'Firmă') : 'Persoană fizică'}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="cell-muted">
                      <span style={{ display: 'block' }}>{client.contactPerson}</span>
                      <span className="small">{client.phone}</span>
                    </td>
                    <td className="cell-muted">{client.city}</td>
                    <td>
                      <span className="row" style={{ gap: 7 }}>
                        <Avatar user={userById(client.ownerId)} size="sm" />
                        <span className="small cell-muted">
                          {userById(client.ownerId)?.name.split(' ')[0]}
                        </span>
                      </span>
                    </td>
                    <td className="right num cell-strong">{money(valueByClient.get(client.id) ?? 0)}</td>
                    <td className="cell-muted small">{date(client.createdAt)}</td>
                    {can('clients.write') && (
                      <td className="right">
                        <button
                          className="btn-icon"
                          aria-label={`Șterge ${client.name}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setRemoving(client)
                          }}
                        >
                          <IconTrash size={15} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {editing && (
        <ClientForm
          client={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      {removing && (
        <ConfirmDialog
          title="Șterge clientul"
          message={`Ștergi „${removing.name}” și toate lead-urile asociate. Acțiunea nu poate fi anulată.`}
          onCancel={() => setRemoving(null)}
          onConfirm={() => {
            dispatch({ type: 'client.remove', id: removing.id })
            setRemoving(null)
          }}
        />
      )}
    </Page>
  )
}

export function ClientForm({ client, onClose }: { client: Client | null; onClose: () => void }) {
  const { state, currentUser, dispatch } = useStore()
  const [form, setForm] = useState<Omit<Client, 'id' | 'createdAt' | 'tags'> & { tags: string }>({
    name: client?.name ?? '',
    type: client?.type ?? 'firma',
    contactPerson: client?.contactPerson ?? '',
    email: client?.email ?? '',
    phone: client?.phone ?? '',
    city: client?.city ?? '',
    address: client?.address ?? '',
    cui: client?.cui ?? '',
    ownerId: client?.ownerId ?? currentUser.id,
    tags: (client?.tags ?? []).join(', '),
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const valid = form.name.trim().length > 1 && form.phone.trim().length > 3

  const submit = () => {
    if (!valid) return
    const payload = {
      ...form,
      name: form.name.trim(),
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    if (client) {
      dispatch({ type: 'client.update', id: client.id, patch: payload })
    } else {
      dispatch({
        type: 'client.add',
        client: { ...payload, id: uid('c'), createdAt: new Date().toISOString() },
      })
    }
    onClose()
  }

  return (
    <Modal
      title={client ? 'Editează clientul' : 'Client nou'}
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid}>
            {client ? 'Salvează' : 'Adaugă client'}
          </button>
        </>
      }
    >
      <div className="form-row">
        <Field label="Denumire *">
          <Input
            value={form.name}
            autoFocus
            onChange={(e) => set('name', e.target.value)}
            placeholder="ex. Nordis Imobiliare SRL"
          />
        </Field>
        <Field label="Tip">
          <Select value={form.type} onChange={(e) => set('type', e.target.value as ClientType)}>
            <option value="firma">Firmă</option>
            <option value="persoana_fizica">Persoană fizică</option>
          </Select>
        </Field>
      </div>

      <div className="form-row">
        <Field label="Persoană de contact">
          <Input
            value={form.contactPerson}
            onChange={(e) => set('contactPerson', e.target.value)}
            placeholder="ex. Vlad Anghel"
          />
        </Field>
        <Field label="Telefon *">
          <Input
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+40 7xx xxx xxx"
          />
        </Field>
      </div>

      <div className="form-row">
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="contact@firma.ro"
          />
        </Field>
        <Field label="Oraș">
          <Input value={form.city} onChange={(e) => set('city', e.target.value)} />
        </Field>
      </div>

      <Field label="Adresă">
        <Input value={form.address} onChange={(e) => set('address', e.target.value)} />
      </Field>

      <div className="form-row">
        {form.type === 'firma' && (
          <Field label="CUI">
            <Input value={form.cui} onChange={(e) => set('cui', e.target.value)} placeholder="RO…" />
          </Field>
        )}
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

      <Field label="Etichete" hint="Separate prin virgulă">
        <Input
          value={form.tags}
          onChange={(e) => set('tags', e.target.value)}
          placeholder="dezvoltator, contract-cadru"
        />
      </Field>

      {form.name.trim() && (
        <div className="row" style={{ gap: 10 }}>
          <span className="avatar" style={{ background: 'var(--accent)' }}>
            {initialsOf(form.name)}
          </span>
          <span className="small muted">Previzualizare inițiale</span>
          <Badge tone="accent">{form.type === 'firma' ? 'Firmă' : 'Persoană fizică'}</Badge>
        </div>
      )}
    </Modal>
  )
}
