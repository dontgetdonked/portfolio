import { useState } from 'react'
import { company, whatsappLink } from '@/data/site'
import { IconCheck, IconWhatsApp } from '@/components/icons'

type Data = { name: string; phone: string; email: string; subject: string; message: string; consent: boolean }
type Errors = Partial<Record<keyof Data, string>>

const subjects = [
  'Ofertă pentru o lucrare',
  'A doua opinie la o lucrare',
  'Colaborare ca furnizor',
  'Angajare în echipă',
  'Altceva',
]

const empty: Data = { name: '', phone: '', email: '', subject: subjects[0], message: '', consent: false }

export function ContactForm() {
  const [data, setData] = useState<Data>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault()
    const e: Errors = {}
    if (data.name.trim().length < 3) e.name = 'Scrie numele tău.'
    const phone = data.phone.replace(/[\s.-]/g, '')
    if (!phone) e.phone = 'Avem nevoie de un număr de telefon.'
    else if (!/^(\+?4)?07\d{8}$/.test(phone)) e.phone = 'Număr invalid. Exemplu: 0721 448 209.'
    if (data.email.trim() && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(data.email.trim()))
      e.email = 'Adresa de e-mail nu pare corectă.'
    if (data.message.trim().length < 10) e.message = 'Scrie câteva cuvinte despre lucrare.'
    if (!data.consent) e.consent = 'Bifează acordul ca să putem răspunde.'
    setErrors(e)
    if (Object.keys(e).length) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="form">
        <div className="sent">
          <span className="sent-mark" aria-hidden>
            <IconCheck size={26} />
          </span>
          <h2>Mesajul a plecat spre birou.</h2>
          <p className="lede">
            Răspundem în aceeași zi lucrătoare, în intervalul {company.hours[0].time}. Dacă e urgent,
            sună direct sau scrie-ne pe WhatsApp.
          </p>
          <div className="actions">
            <a
              className="btn btn-line"
              href={whatsappLink(`Bună ziua! Am trimis un mesaj pe site: ${data.message}`)}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp className="wa" />
              Continuă pe WhatsApp
            </a>
            <a className="btn btn-line" href={company.phoneHref}>
              {company.phone}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-head">
        <b>Scrie-ne</b>
        <span className="small muted">Răspundem în aceeași zi lucrătoare</span>
      </div>
      <div className="form-body">
        <div className="form-grid">
          <label className={errors.name ? 'field has-error' : 'field'}>
            <span>Nume și prenume</span>
            <input autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} />
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
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>

          <label className={errors.email ? 'field has-error' : 'field'}>
            <span>E-mail (opțional)</span>
            <input type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label className="field">
            <span>Despre ce este vorba</span>
            <select value={data.subject} onChange={(e) => set('subject', e.target.value)}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className={errors.message ? 'field has-error span-2' : 'field span-2'}>
            <span>Mesajul tău</span>
            <textarea
              placeholder="Ce ai de renovat, ce suprafață are și până când ai vrea gata."
              value={data.message}
              onChange={(e) => set('message', e.target.value)}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </label>
        </div>

        <label className={errors.consent ? 'consent field has-error' : 'consent'}>
          <input type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)} />
          <span>
            Sunt de acord să folosiți datele ca să îmi răspundeți la mesaj.
            {errors.consent && <b className="field-error"> {errors.consent}</b>}
          </span>
        </label>
      </div>
      <div className="form-foot">
        <span className="small muted">Pentru ofertă completă, folosește formularul de ofertă.</span>
        <button className="btn" type="submit">
          Trimite mesajul
        </button>
      </div>
    </form>
  )
}
