import { Link } from 'react-router-dom'
import { services } from '@/data/site'
import { materials, serviceMaterial } from '@/data/media'
import { Chip, Tag, splitPrice } from '@/components/ui'

/* Services read as a supplier's price list. Each row carries the code of the
   sample it uses, so a chip on the board can be found again in the list. */
export function PriceList() {
  return (
    <div className="pricelist">
      <div className="pl-head" aria-hidden>
        <span>Mostră</span>
        <span>Lucrare</span>
        <span>Preț de pornire, 2026</span>
      </div>
      <ol>
        {services.map((s) => {
          const m = materials[serviceMaterial[s.slug]]
          const { figure, unit } = splitPrice(s.price)
          /* the design-only price already says "pentru proiect"; the duration
             line does not need to repeat it */
          const duration = unit === 'pentru proiect' ? s.duration.replace(/ proiectul$/, '') : s.duration
          return (
            <li className="pl-row" key={s.slug}>
              <Chip photo={m.photo} size="thumb" className="pl-chip">
                <Tag code={m.code} />
              </Chip>
              <div className="pl-body">
                <h3>
                  <Link to={`/servicii#${s.slug}`}>{s.title}</Link>
                </h3>
                <p>{s.summary}</p>
              </div>
              <div className="pl-meta">
                <span className="pl-from">de la</span>
                <span className="pl-price">{figure}</span>
                <span className="pl-dur">
                  {unit && `${unit}, `}
                  {duration}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
