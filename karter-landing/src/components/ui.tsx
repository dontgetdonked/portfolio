import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { company, whatsappLink } from '@/data/site'
import { IconCheck, IconStar, IconWhatsApp } from '@/components/icons'

/* The rule above a section carries a measure of what follows — a count, a
   price, a year — rather than a decorative label. */
export function Opener({
  measure,
  title,
  text,
  aside,
}: {
  measure: string
  title: string
  text?: string
  aside?: ReactNode
}) {
  return (
    <div className="opener">
      <p className="opener-rule">{measure}</p>
      <div className="opener-text">
        <h2>{title}</h2>
        <div className="stack-sm">
          {text && <p className="lede">{text}</p>}
          {aside}
        </div>
      </div>
    </div>
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
