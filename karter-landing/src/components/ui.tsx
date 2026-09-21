import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { company, whatsappLink } from '@/data/site'
import { materials, photos, type Material, type PhotoKey } from '@/data/media'
import { IconArrow, IconCheck, IconPhone, IconWhatsApp } from '@/components/icons'

/* The board's three sizes of photo each get a sizes hint, so a small chip
   never downloads the large file. */
const sizesFor = {
  full: '(min-width: 1320px) 1320px, 100vw',
  half: '(min-width: 900px) 50vw, 100vw',
  third: '(min-width: 900px) 30vw, 50vw',
  thumb: '140px',
} as const

export function Photo({
  name,
  size = 'half',
  eager = false,
}: {
  name: PhotoKey
  size?: keyof typeof sizesFor
  eager?: boolean
}) {
  const p = photos[name]
  return (
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizesFor[size]}
      alt={p.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
    />
  )
}

/* The paper label pinned to a chip: code first, then the name, then the spec. */
export function Tag({
  code,
  name,
  spec,
  className,
}: {
  code?: string
  name?: string
  spec?: string
  className?: string
}) {
  return (
    <span className={className ? `tag ${className}` : 'tag'}>
      {code && <b>{code}</b>}
      {name && <span className="tag-name">{name}</span>}
      {spec && <span className="tag-spec">{spec}</span>}
    </span>
  )
}

/* "de la 3.400 € / baie" reads as a figure plus its unit: the figure is set
   large, the words around it stay on the small line so nothing wraps. */
export function splitPrice(price: string) {
  const m = price.match(/^de la ([\d.,]+ €(?:\/mp)?)\s*(?:\/\s*)?(.*)$/)
  if (!m) return { figure: price, unit: '' }
  const rest = m[2].trim()
  return { figure: m[1], unit: !rest ? '' : rest === 'proiectul' ? 'pentru proiect' : `per ${rest}` }
}

export function MaterialTag({ m, className }: { m: Material; className?: string }) {
  return <Tag code={m.code} name={m.name} spec={m.spec} className={className} />
}

export function Chip({
  material,
  photo,
  size = 'third',
  className,
  style,
  eager,
  children,
}: {
  material?: keyof typeof materials
  photo?: PhotoKey
  size?: keyof typeof sizesFor
  className?: string
  style?: CSSProperties
  eager?: boolean
  children?: ReactNode
}) {
  const m = material ? materials[material] : undefined
  const name = photo ?? m?.photo
  return (
    <div className={className ? `chip ${className}` : 'chip'} style={style}>
      {name && <Photo name={name} size={size} eager={eager} />}
      {m && !children && <MaterialTag m={m} />}
      {children}
    </div>
  )
}

export function PageHead({
  crumb,
  title,
  lede,
  photo,
  tag,
  children,
}: {
  crumb: ReactNode
  title: string
  lede: string
  photo: PhotoKey
  tag: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="page-head">
      <div className="wrap page-board">
        <div className="chip page-plaster">
          <Photo name="plaster" size="half" eager />
          <p className="crumb">
            <Link to="/">Acasă</Link>
            <span aria-hidden>/</span>
            {crumb}
          </p>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          {children}
        </div>
        <div className="chip page-photo">
          <Photo name={photo} size="third" eager />
          {tag}
        </div>
      </div>
    </section>
  )
}

export function Rating({ value }: { value: number }) {
  return (
    <span className="rating" aria-label={`${value} din 5`}>
      <span className="sqs" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < value ? 'sq' : 'sq off'} />
        ))}
      </span>
      <span aria-hidden>{value} din 5</span>
    </span>
  )
}

export function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>
          <span className="box" aria-hidden>
            <IconCheck size={14} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function More({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="link" to={to}>
      {children}
      <IconArrow size={16} />
    </Link>
  )
}

export function Closing({
  title = 'Spune-ne ce ai de renovat',
  text = 'Vizita și măsurătorile sunt gratuite în Cluj și în comunele limitrofe. Devizul pe poziții ajunge la tine în trei zile lucrătoare.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="section field-dark">
      <div className="wrap closing">
        <div className="stack">
          <h2>{title}</h2>
          <p className="lede">{text}</p>
        </div>
        <div className="closing-card">
          <p className="small muted">Luni – vineri, 08:00 – 18:00</p>
          <a className="phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <div className="actions">
            <Link className="btn" to="/oferta">
              Cere ofertă
              <IconArrow size={16} />
            </Link>
            <a
              className="btn btn-line"
              href={whatsappLink('Bună ziua! Am o lucrare de renovare și aș vrea o estimare.')}
              target="_blank"
              rel="noreferrer"
            >
              <IconWhatsApp className="wa" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CallLink() {
  return (
    <a className="link" href={company.phoneHref}>
      <IconPhone size={16} />
      {company.phone}
    </a>
  )
}
