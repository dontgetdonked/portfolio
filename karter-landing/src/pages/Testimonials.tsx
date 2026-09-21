import { Link } from 'react-router-dom'
import { projects, reviewStats, testimonials } from '@/data/site'
import { Closing, PageHead, Rating, Tag } from '@/components/ui'
import { IconArrow } from '@/components/icons'

export default function Testimonials() {
  return (
    <>
      <PageHead
        crumb="Testimoniale"
        title="Ce spun beneficiarii după recepție"
        lede="Cerem părerea la o lună după predare, când se vede dacă ceva scârțâie. Publicăm și recenziile de patru stele, cu motivul lor cu tot."
        photo="kitchen"
        tag={<Tag name="Bucătărie cu insulă" spec="foto ilustrativă" />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Recenzii">
        <div className="wrap">
          <div className="score">
            <strong>{reviewStats.average}</strong>
            <span>
              din 5, media pe {reviewStats.count} recenzii din {reviewStats.since} încoace.{' '}
              {reviewStats.recommend} dintre beneficiari ne-au recomandat mai departe.
            </span>
          </div>

          <div className="voices is-all">
            {testimonials.map((t) => {
              const project = projects.find((p) => p.slug === t.project)
              return (
                <figure className="voice" key={t.name}>
                  <Rating value={t.rating} />
                  <blockquote>{t.text}</blockquote>
                  <figcaption>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                    {project && (
                      <Link className="link" to={`/proiecte/${project.slug}`} style={{ marginTop: 8 }}>
                        Vezi lucrarea
                        <IconArrow size={16} />
                      </Link>
                    )}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <Closing
        title="Vrei să vorbești cu unul dintre ei?"
        text="La cerere, îți dăm numărul a doi beneficiari cu lucrări asemănătoare cu a ta, dacă au fost de acord."
      />
    </>
  )
}
