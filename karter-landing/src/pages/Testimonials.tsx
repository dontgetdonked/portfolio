import { Link } from 'react-router-dom'
import { projects, testimonials } from '@/data/site'
import { CtaBand, PageHead, Stars } from '@/components/ui'

const average = (
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
).toFixed(1)

export default function Testimonials() {
  return (
    <>
      <PageHead
        crumb="Testimoniale"
        title="Ce spun beneficiarii după recepția lucrării"
        lede="Cerem părerea la o lună după predare, când se vede dacă ceva scârțâie. Publicăm și recenziile de patru stele, cu motivul lor cu tot."
      />

      <section className="band">
        <div className="wrap">
          <div className="rating-bar">
            <b>{average}</b>
            <span>media pe 112 recenzii, din 2019 încoace</span>
            <span>96% dintre beneficiari ne-au recomandat mai departe</span>
          </div>

          <div className="quote-grid">
            {testimonials.map((t) => {
              const project = projects.find((p) => p.slug === t.project)
              return (
                <figure className="quote-card" key={t.name}>
                  <Stars value={t.rating} />
                  <blockquote>{t.text}</blockquote>
                  <figcaption className="who">
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                    {project && (
                      <Link className="link-u" to={`/proiecte/${project.slug}`} style={{ justifySelf: 'start', marginTop: 8 }}>
                        Vezi lucrarea
                      </Link>
                    )}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Vrei să vorbești cu unul dintre ei?"
        text="La cerere, îți dăm numărul a doi beneficiari cu lucrări asemănătoare cu a ta, dacă au fost de acord."
      />
    </>
  )
}
