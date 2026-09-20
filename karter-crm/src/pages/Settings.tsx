import { Page } from '@/components/layout'
import { Avatar, Badge, Card, Field, Input } from '@/components/ui'
import { IconCheck, IconMoon, IconRefresh, IconSun } from '@/components/icons'
import { useStore } from '@/store/store'
import { useTheme } from '@/store/theme'
import { ROLE_LABEL, ROLE_PERMISSIONS } from '@/types'

const PERMISSION_LABEL: Record<string, string> = {
  'clients.write': 'Adaugă și editează clienți',
  'leads.write': 'Adaugă și editează lead-uri',
  'pipeline.move': 'Mută lead-uri în pipeline',
  'tasks.write': 'Gestionează task-uri și calendar',
  'invoices.write': 'Emite oferte și facturi',
  'invoices.delete': 'Șterge documente financiare',
  'users.manage': 'Gestionează utilizatori',
  'settings.manage': 'Modifică setările firmei',
}

export default function Settings() {
  const { state, currentUser, can, resetDemo } = useStore()
  const { theme, toggle } = useTheme()

  const counts = [
    ['Clienți', state.clients.length],
    ['Lead-uri', state.leads.length],
    ['Task-uri', state.tasks.length],
    ['Programări', state.events.length],
    ['Note', state.notes.length],
    ['Conversații', state.conversations.length],
    ['Documente', state.documents.length],
  ] as const

  return (
    <Page title="Setări" subtitle="Preferințe de afișare, contul tău și datele demo">
      <div className="grid grid-2">
        <Card title="Contul meu">
          <div className="row" style={{ gap: 14, marginBottom: 18 }}>
            <Avatar user={currentUser} size="lg" />
            <div>
              <div style={{ fontWeight: 650, fontSize: 15 }}>{currentUser.name}</div>
              <div className="small muted">{currentUser.email}</div>
              <Badge tone="accent">{ROLE_LABEL[currentUser.role]}</Badge>
            </div>
          </div>

          <div className="stack" style={{ gap: 7 }}>
            <span className="field-label">Ce poți face cu rolul tău</span>
            {ROLE_PERMISSIONS[currentUser.role].map((permission) => (
              <span key={permission} className="meta-chip small muted">
                <IconCheck size={13} />
                {PERMISSION_LABEL[permission]}
              </span>
            ))}
          </div>

          <p className="small muted" style={{ marginTop: 14 }}>
            Schimbă utilizatorul din colțul din stânga jos pentru a vedea cum arată aplicația
            pentru fiecare rol.
          </p>
        </Card>

        <Card title="Aspect">
          <div className="row-between" style={{ marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600 }}>Temă</div>
              <div className="small muted">
                {theme === 'light' ? 'Deschisă' : 'Închisă'} · salvată în acest browser
              </div>
            </div>
            <button className="btn" onClick={toggle}>
              {theme === 'light' ? <IconMoon size={15} /> : <IconSun size={15} />}
              Comută
            </button>
          </div>

          <Field label="Denumire firmă">
            <Input defaultValue="Karter Construcții SRL" />
          </Field>
          <div className="form-row" style={{ marginTop: 14 }}>
            <Field label="Monedă">
              <Input defaultValue="RON (lei)" readOnly />
            </Field>
            <Field label="Cotă TVA implicită">
              <Input defaultValue="19%" readOnly />
            </Field>
          </div>
        </Card>
      </div>

      <Card title="Date demo" action={<Badge tone="info">stocare locală</Badge>}>
        <p className="small muted" style={{ marginBottom: 14 }}>
          Această aplicație de portofoliu rulează integral în browser. Tot ce adaugi sau modifici
          se salvează în <code>localStorage</code>, deci rămâne pe acest dispozitiv și nu pleacă
          nicăieri. Resetarea reîncarcă setul de date demo.
        </p>

        <div className="row" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {counts.map(([label, value]) => (
            <Badge key={label}>
              {label}: <strong style={{ fontWeight: 700 }}>{value}</strong>
            </Badge>
          ))}
        </div>

        <button className="btn btn-danger" onClick={resetDemo} disabled={!can('settings.manage')}>
          <IconRefresh size={15} />
          Resetează datele demo
        </button>
        {!can('settings.manage') && (
          <p className="small muted" style={{ marginTop: 8 }}>
            Doar administratorii pot reseta datele.
          </p>
        )}
      </Card>
    </Page>
  )
}
