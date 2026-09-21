import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { company, whatsappLink } from '@/data/site'
import { IconCheck, IconStar, IconWhatsApp } from '@/components/icons'

/* A hairline opens the section; the count that used to sit above the heading
   now reads as a sentence next to it, where it is content instead of a label. */
export function Opener({
  measure,
  title,
  text,
  aside,
}: {
  measure?: string
  title: string
  text?: string
  aside?: ReactNode
}) {
  return (
    <div className="opener">
      <div className="opener-text">
        <h2>{title}</h2>
        <div className="stack-sm">
          {text && <p className="lede">{text}</p>}
          {measure && <p className="measure">{measure}</p>}
          {aside}
        </div>
      </div>
    </div>
  )
}

/* Four figures read as a row from a spec sheet: label first, value second,
   set in tabular numerals so the columns line up. */
export function Ledger({
  items,
  tone = 'light',
}: {
  items: readonly { value: string; label: string }[]
  tone?: 'light' | 'dark'
}) {
  return (
    <dl className={tone === 'dark' ? 'ledger is-dark' : 'ledger'}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PageHead({
  crumb,
  title,
  lede,
  children,
}: {
  crumb: string
  title: string
  lede: string
  children?: ReactNode
}) {
  return (
    <section className="page-head">
      <div className="wrap">
        <p className="crumb">
          <Link to="/">Acasă</Link> / {crumb}
        </p>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        {children}
      </div>
    </section>
  )
}

export function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value} din 5 stele`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} className={i < value ? undefined : 'muted'} />
      ))}
    </span>
  )
}

export function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <IconCheck size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CtaBand({
  title = 'Spune-ne ce ai de renovat',
  text = 'Vizita și măsurătorile sunt gratuite în Cluj și în comunele limitrofe. Devizul pe poziții ajunge la tine în trei zile lucrătoare.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="band band-tight band-dark">
      <div className="wrap cta-grid">
        <div className="stack">
          <h2 style={{ fontSize: 'var(--step-3)' }}>{title}</h2>
          <p className="lede">{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn" to="/oferta">
            Cere ofertă
          </Link>
          <a
            className="btn btn-whats"
            href={whatsappLink('Bună ziua! Am o lucrare de renovare și aș vrea o estimare.')}
            target="_blank"
            rel="noreferrer"
          >
            <IconWhatsApp />
            WhatsApp
          </a>
          <a className="btn btn-quiet" href={company.phoneHref}>
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
