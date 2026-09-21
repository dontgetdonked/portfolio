import { Link } from 'react-router-dom'
import type { Project } from '@/data/site'
import { projectPhoto } from '@/data/media'
import { Chip, Tag } from '@/components/ui'
import { IconArrow } from '@/components/icons'

/* A project as a site sheet: the photo chip, the title, then place and year
   and the three figures from the contract, with the contract value largest. */
export function ProjectSheet({ project: p, lead = false }: { project: Project; lead?: boolean }) {
  return (
    <Link className="sheet" to={`/proiecte/${p.slug}`}>
      <Chip photo={projectPhoto[p.slug]} size={lead ? 'half' : 'third'} className="sheet-photo">
        <Tag name={p.category} spec="foto ilustrativă" />
      </Chip>
      <div className="sheet-body">
        <h3>{p.title}</h3>
        <p className="sheet-where">
          {p.place}, {p.year}
        </p>
        <p className="sheet-intro">{p.intro}</p>
        <dl className="sheet-specs">
          <dt>valoare contract</dt>
          <dd className="is-lead">{p.budget}</dd>
          <dt>suprafață</dt>
          <dd>{p.surface}</dd>
          <dt>durata lucrării</dt>
          <dd>{p.duration}</dd>
        </dl>
        <span className="link sheet-go">
          Vezi lucrarea în detaliu
          <IconArrow size={16} />
        </span>
      </div>
    </Link>
  )
}
