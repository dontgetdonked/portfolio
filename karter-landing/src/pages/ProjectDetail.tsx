import { Link, Navigate, useParams } from 'react-router-dom'
import { projects, testimonials } from '@/data/site'
import { materials, projectFinish, projectPhoto } from '@/data/media'
import { ProjectSheet } from '@/components/ProjectSheet'
import { Checks, Chip, Closing, MaterialTag, Photo, Rating, Tag } from '@/components/ui'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/proiecte" replace />

  const voice = testimonials.find((t) => t.project === project.slug)
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2)
  const finish = materials[projectFinish[project.slug]]

  return (
    <>
      <section className="page-head">
        <div className="wrap page-board">
          <div className="chip page-plaster">
            <Photo name="plaster" size="half" eager />
            <p className="crumb">
              <Link to="/">Acasă</Link>
              <span aria-hidden>/</span>
              <Link to="/proiecte">Proiecte</Link>
              <span aria-hidden>/</span>
              {project.category}
            </p>
            <h1>{project.title}</h1>
            <p className="lede">{project.intro}</p>
          </div>
          <Chip photo={projectPhoto[project.slug]} size="half" className="page-photo" eager>
            <Tag name={project.category} spec="foto ilustrativă" />
          </Chip>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Fișa lucrării">
        <div className="wrap stack" style={{ gap: 'clamp(40px, 5vw, 72px)' }}>
          <dl className="ledger">
            <div>
              <dt>Valoare contract</dt>
              <dd className="is-lead">{project.budget}</dd>
            </div>
            <div>
              <dt>Suprafață</dt>
              <dd>{project.surface}</dd>
            </div>
            <div>
              <dt>Durata lucrării</dt>
              <dd>{project.duration}</dd>
            </div>
            <div>
              <dt>Locul</dt>
              <dd>{project.place}</dd>
            </div>
            <div>
              <dt>Anul predării</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <div className="found">
            <article className="found-card">
              <Chip photo="brick" size="half">
                <MaterialTag m={{ ...materials.brick, spec: 'mostră ilustrativă' }} />
              </Chip>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>Ce am găsit pe șantier</h2>
                <p className="found-note">{project.beforeNote}</p>
                <p>{project.brief}</p>
              </div>
            </article>
            <article className="found-card">
              <Chip photo={finish.photo} size="half">
                <MaterialTag m={{ ...finish, spec: 'mostră ilustrativă' }} />
              </Chip>
              <div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>Ce am executat</h2>
                <p className="found-note">{project.afterNote}</p>
                <Checks items={project.work} />
              </div>
            </article>
          </div>

          {voice && (
            <figure className="voice is-lead" style={{ maxWidth: 880 }}>
              <Rating value={voice.rating} />
              <blockquote>{voice.text}</blockquote>
              <figcaption>
                <b>{voice.name}</b>
                <span>{voice.role}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="alte-lucrari">
        <div className="wrap">
          <div className="head-row">
            <h2 id="alte-lucrari">Alte lucrări</h2>
          </div>
          <div className="sheets is-grid">
            {others.map((p) => (
              <ProjectSheet key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </>
  )
}
