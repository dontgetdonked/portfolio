import { useMemo, useState } from 'react'
import {
  budgetRanges,
  company,
  extraWork,
  projectTypes,
  timeframes,
  whatsappLink,
} from '@/data/site'
import { IconCheck, IconPhone, IconWhatsApp } from '@/components/icons'

type Data = {
  type: string
  surface: string
  place: string
  budget: string
  timeframe: string
  extras: string[]
  name: string
  phone: string
  email: string
  details: string
  consent: boolean
}

const empty: Data = {
  type: '',
  surface: '',
  place: '',
  budget: '',
  timeframe: '',
  extras: [],
  name: '',
  phone: '',
  email: '',
  details: '',
  consent: false,
}

const stepNames = ['Lucrarea', 'Bugetul și termenul', 'Datele tale']

type Errors = Partial<Record<keyof Data, string>>

function validate(step: number, d: Data): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!d.type) e.type = 'Alege tipul lucrării.'
    const mp = Number(d.surface.replace(',', '.'))
    if (!d.surface.trim()) e.surface = 'Scrie suprafața aproximativă.'
    else if (!Number.isFinite(mp) || mp <= 0) e.surface = 'Scrie un număr de metri pătrați.'
    if (!d.place.trim()) e.place = 'Scrie localitatea și cartierul.'
  }
  if (step === 1) {
    if (!d.budget) e.budget = 'Alege un interval, chiar și orientativ.'
    if (!d.timeframe) e.timeframe = 'Alege când ai vrea să înceapă lucrarea.'
  }
  if (step === 2) {
    if (d.name.trim().length < 3) e.name = 'Scrie numele tău.'
    const phone = d.phone.replace(/[\s.-]/g, '')
    if (!phone) e.phone = 'Avem nevoie de un număr de telefon.'
    else if (!/^(\+?4)?07\d{8}$/.test(phone)) e.phone = 'Număr invalid. Exemplu: 0721 448 209.'
    if (d.email.trim() && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(d.email.trim()))
      e.email = 'Adresa de e-mail nu pare corectă.'
    if (!d.consent) e.consent = 'Bifează acordul ca să putem răspunde.'
  }
  return e
}

function typeLabel(value: string) {
  return projectTypes.find((t) => t.value === value)?.label ?? value
}

export function QuoteForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Data>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const message = useMemo(() => {
    const lines = [
      'Cerere de ofertă de pe site:',
      `Lucrare: ${typeLabel(data.type)}`,
      `Suprafață: ${data.surface} mp`,
      `Locație: ${data.place}`,
      `Buget: ${data.budget}`,
      `Termen: ${data.timeframe}`,
    ]
    if (data.extras.length) lines.push(`Include și: ${data.extras.join(', ')}`)
    lines.push(`Nume: ${data.name}`, `Telefon: ${data.phone}`)
    if (data.details.trim()) lines.push(`Detalii: ${data.details.trim()}`)
    return lines.join('\n')
  }, [data])

  function next() {
    const e = validate(step, data)
    setErrors(e)
    if (Object.keys(e).length) return
    setStep((s) => s + 1)
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate(2, data)
    setErrors(e)
    if (Object.keys(e).length) return
    try {
      const key = 'atrium.cereri'
      const all = JSON.parse(localStorage.getItem(key) ?? '[]')
      all.push({ ...data, at: new Date().toISOString() })
      localStorage.setItem(key, JSON.stringify(all))
    } catch {
      /* stocarea locală poate fi blocată; cererea rămâne afișată pe ecran */
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="form">
        <div className="sent">
          <span className="sent-mark" aria-hidden>
            <IconCheck size={26} />
          </span>
          <h2>Cererea a ajuns la noi, {data.name.split(' ')[0]}.</h2>
          <p className="lede">
            Te sunăm de pe {company.phone} în maximum o zi lucrătoare, ca să stabilim vizita de
            măsurare. Devizul pe poziții vine în trei zile lucrătoare după vizită.
          </p>
          <dl className="summary">
            <div>
              <dt>Lucrare</dt>
              <dd>
                <b>{typeLabel(data.type)}</b>
              </dd>
            </div>
            <div>
              <dt>Suprafață</dt>
              <dd>
                <b>{data.surface} mp</b>
              </dd>
            </div>
            <div>
              <dt>Locație</dt>
              <dd>
                <b>{data.place}</b>
              </dd>
            </div>
            <div>
              <dt>Buget</dt>
              <dd>
                <b>{data.budget}</b>
              </dd>
            </div>
            <div>
              <dt>Termen</dt>
              <dd>
                <b>{data.timeframe}</b>
              </dd>
            </div>
          </dl>
          <div className="actions">
            <a className="btn btn-line" href={whatsappLink(message)} target="_blank" rel="noreferrer">
              <IconWhatsApp className="wa" />
              Trimite datele și pe WhatsApp
            </a>
            <a className="btn btn-line" href={company.phoneHref}>
              <IconPhone />
              Sună acum
            </a>
            <button
              className="btn btn-line"
              type="button"
              onClick={() => {
                setData(empty)
                setStep(0)
                setSent(false)
              }}
            >
              Trimite altă cerere
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-head">
        <b aria-live="polite">
          Pasul {step + 1} din 3: {stepNames[step]}
        </b>
        <span className="steps-bar" aria-hidden>
          {stepNames.map((name, i) => (
            <i key={name} className={i < step ? 'is-done' : i === step ? 'is-now' : undefined} />
          ))}
        </span>
      </div>

      <div className="form-body">
        {step === 0 && (
          <>
            <div className="field">
              <span id="lbl-type" className="group-label">
                Ce ai de făcut?
              </span>
              <div className="picker" role="group" aria-labelledby="lbl-type">
                {projectTypes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className="pick"
                    aria-pressed={data.type === t.value}
                    onClick={() => set('type', t.value)}
                  >
                    <span className="pick-box" aria-hidden>
                      {data.type === t.value && <IconCheck size={14} />}
                    </span>
                    <span>
                      <b>{t.label}</b>
                      <span>{t.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
              {errors.type && <span className="field-error">{errors.type}</span>}
            </div>

            <div className="form-grid">
              <label className={errors.surface ? 'field has-error' : 'field'}>
                <span>Suprafața aproximativă (mp)</span>
                <input
                  inputMode="decimal"
                  placeholder="de exemplu 74"
                  value={data.surface}
                  onChange={(e) => set('surface', e.target.value)}
                  aria-invalid={Boolean(errors.surface)}
                />
                {errors.surface ? (
                  <span className="field-error">{errors.surface}</span>
                ) : (
                  <span className="field-hint">Dacă nu o știi exact, scrie o estimare.</span>
                )}
              </label>

              <label className={errors.place ? 'field has-error' : 'field'}>
                <span>Unde se află lucrarea?</span>
                <input
                  placeholder="Cluj-Napoca, Gheorgheni"
                  value={data.place}
                  onChange={(e) => set('place', e.target.value)}
                  aria-invalid={Boolean(errors.place)}
                />
                {errors.place && <span className="field-error">{errors.place}</span>}
              </label>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="form-grid">
              <label className={errors.budget ? 'field has-error' : 'field'}>
                <span>Bugetul pe care îl ai în minte</span>
                <select value={data.budget} onChange={(e) => set('budget', e.target.value)}>
                  <option value="">Alege un interval</option>
                  {budgetRanges.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                {errors.budget && <span className="field-error">{errors.budget}</span>}
              </label>

              <label className={errors.timeframe ? 'field has-error' : 'field'}>
                <span>Când ai vrea să înceapă</span>
                <select value={data.timeframe} onChange={(e) => set('timeframe', e.target.value)}>
                  <option value="">Alege un termen</option>
                  {timeframes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.timeframe && <span className="field-error">{errors.timeframe}</span>}
              </label>
            </div>

            <div className="field">
              <span id="lbl-extras" className="group-label">
                Vrei să includem și:
              </span>
              <div className="picker" role="group" aria-labelledby="lbl-extras">
                {extraWork.map((x) => {
                  const on = data.extras.includes(x)
                  return (
                    <button
                      key={x}
                      type="button"
                      className="pick"
                      aria-pressed={on}
                      onClick={() =>
                        set('extras', on ? data.extras.filter((v) => v !== x) : [...data.extras, x])
                      }
                    >
                      <span className="pick-box" aria-hidden>
                        {on && <IconCheck size={14} />}
                      </span>
                      <span>
                        <b>{x}</b>
                      </span>
                    </button>
                  )
                })}
              </div>
              <span className="field-hint">Poți bifa mai multe sau niciuna.</span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-grid">
              <label className={errors.name ? 'field has-error' : 'field'}>
                <span>Nume și prenume</span>
                <input
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <label className={errors.phone ? 'field has-error' : 'field'}>
                <span>Telefon</span>
                <input
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0721 448 209"
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>

              <label className={errors.email ? 'field has-error span-2' : 'field span-2'}>
                <span>E-mail, dacă vrei devizul și în scris</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>

              <label className="field span-2">
                <span>Detalii despre lucrare</span>
                <textarea
                  placeholder="Ce vrei schimbat, ce păstrezi, ce te grăbește."
                  value={data.details}
                  onChange={(e) => set('details', e.target.value)}
                />
              </label>
            </div>

            <dl className="summary">
              <div>
                <dt>Lucrare</dt>
                <dd>{typeLabel(data.type)}</dd>
              </div>
              <div>
                <dt>Suprafață</dt>
                <dd>{data.surface} mp</dd>
              </div>
              <div>
                <dt>Locație</dt>
                <dd>{data.place}</dd>
              </div>
              <div>
                <dt>Buget</dt>
                <dd>{data.budget}</dd>
              </div>
              <div>
                <dt>Termen</dt>
                <dd>{data.timeframe}</dd>
              </div>
              {data.extras.length > 0 && (
                <div>
                  <dt>Include și</dt>
                  <dd style={{ textAlign: 'right' }}>{data.extras.join(', ')}</dd>
                </div>
              )}
            </dl>

            <label className={errors.consent ? 'consent field has-error' : 'consent'}>
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set('consent', e.target.checked)}
              />
              <span>
                Sunt de acord să folosiți datele de mai sus ca să îmi trimiteți oferta. Nu le
                transmitem altcuiva și le ștergem la cerere.
                {errors.consent && <b className="field-error"> {errors.consent}</b>}
              </span>
            </label>
          </>
        )}
      </div>

      <div className="form-foot">
        {step > 0 ? (
          <button className="btn btn-line" type="button" onClick={() => setStep((s) => s - 1)}>
            Înapoi
          </button>
        ) : (
          <span className="small muted">Durează sub două minute.</span>
        )}

        {step < 2 ? (
          <button className="btn" type="button" onClick={next}>
            Continuă
          </button>
        ) : (
          <button className="btn" type="submit">
            Trimite cererea
          </button>
        )}
      </div>
    </form>
  )
}
