import { Link } from 'react-router-dom'
import { processSteps, services } from '@/data/site'
import { Scene } from '@/components/Scene'
import { CtaBand, Checklist, Opener, PageHead } from '@/components/ui'

export default function Services() {
  return (
    <>
      <PageHead
        crumb="Servicii"
        title="Lucrările pe care le facem cu echipe proprii"
        lede="Nu subcontractăm finisajele, instalațiile și fațadele. Asta ține prețul previzibil și pune răspunderea într-un singur loc: la noi."
      />

      <section className="band">
        <div className="wrap stack" style={{ gap: 'clamp(28px, 4vw, 48px)' }}>
          {services.map((s) => (
            <article className="proj-strip" key={s.slug} id={s.slug}>
              <div className="proj-art">
                <Scene variant={s.scene} state="after" />
              </div>
              <div className="proj-body">
                <h2 style={{ fontSize: 'var(--step-3)' }}>{s.title}</h2>
                <p className="muted">{s.summary}</p>
                <Checklist items={s.includes} />
                <div className="proj-specs">
                  <div>
                    <b>{s.price}</b>
                    <span>preț de pornire</span>
                  </div>
                  <div>
                    <b>{s.duration}</b>
                    <span>durată obișnuită</span>
                  </div>
                  <div>
                    <b>5 ani</b>
                    <span>garanție la manoperă</span>
                  </div>
                </div>
                <Link className="btn btn-sm" to="/oferta" style={{ justifySelf: 'start' }}>
                  Cere deviz pentru {s.title.toLowerCase()}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-dark band-tight">
        <div className="wrap">
          <Opener
            title="Cum lucrăm"
            text="Etapa curentă și cea următoare sunt scrise în raportul de vineri, ca să știi mereu unde s-a ajuns."
          />
          <ol className="steps">
            {processSteps.map((s, i) => (
              <li className="step" key={s.title}>
                <span className="step-n">{i + 1}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p className="step-when">{s.when}</p>
                </div>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Nu ești sigur în ce categorie intră lucrarea ta?"
        text="Scrie-ne ce ai de făcut, în cuvintele tale. Noi o încadrăm și îți spunem cât durează și cât costă."
      />
    </>
  )
}
