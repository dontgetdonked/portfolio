import { Link, Navigate, useParams } from 'react-router-dom'
import { projects, testimonials } from '@/data/site'
import { BeforeAfter } from '@/components/BeforeAfter'
import { Checklist, CtaBand, Stars } from '@/components/ui'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/proiecte" replace />

  const voice = testimonials.find((t) => t.project === project.slug)
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="crumb">
            <Link to="/">Acasă</Link> / <Link to="/proiecte">Proiecte</Link> / {project.category}
          </p>
          <h1>{project.title}</h1>
          <p className="lede">{project.intro}</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack" style={{ gap: 'clamp(28px, 4vw, 48px)' }}>
          <BeforeAfter
            variant={project.scene}
            beforeNote={project.beforeNote}
            afterNote={project.afterNote}
            caption={`${project.place}, ${project.year}`}
            meta={`${project.surface}, ${project.duration}, ${project.budget}`}
          />

          <div className="split-2">
            <div className="stack">
              <h2 style={{ fontSize: 'var(--step-3)' }}>Ce am găsit pe șantier</h2>
              <p>{project.brief}</p>
            </div>
            <div className="stack">
              <h2 style={{ fontSize: 'var(--step-3)' }}>Ce am executat</h2>
              <Checklist items={project.work} />
            </div>
          </div>

          {voice && (
            <figure className="quote-card" style={{ maxWidth: 720 }}>
              <Stars value={voice.rating} />
              <blockquote>{voice.text}</blockquote>
              <figcaption className="who">
                <b>{voice.name}</b>
                <span>{voice.role}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="band band-plaster band-tight">
        <div className="wrap">
          <h2 style={{ fontSize: 'var(--step-3)', marginBottom: 24 }}>Alte lucrări</h2>
          <div className="quote-grid">
            {others.map((p) => (
              <Link className="quote-card" to={`/proiecte/${p.slug}`} key={p.slug}>
                <p className="proj-where">
                  {p.place}, {p.year}
                </p>
                <h3 style={{ fontSize: '1.25rem' }}>{p.title}</h3>
                <p className="small muted">
                  {p.surface}, {p.duration}, {p.budget}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
