import { Link } from 'react-router-dom'
import { processSteps, services } from '@/data/site'
import { materials, serviceMaterial } from '@/data/media'
import { Schedule } from '@/components/Schedule'
import { Checks, Chip, Closing, MaterialTag, PageHead, splitPrice } from '@/components/ui'
import { IconArrow } from '@/components/icons'

export default function Services() {
  return (
    <>
      <PageHead
        crumb="Servicii"
        title="Lucrările pe care le facem cu echipe proprii"
        lede="Nu subcontractăm finisajele, instalațiile și fațadele. Asta ține prețul previzibil și pune răspunderea într-un singur loc: la noi."
        photo="tile"
        tag={<MaterialTag m={materials.tile} />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Servicii">
        <div className="wrap">
          {services.map((s) => {
            const m = materials[serviceMaterial[s.slug]]
            const { figure, unit } = splitPrice(s.price)
            return (
              <article className="svc" key={s.slug} id={s.slug}>
                <Chip photo={m.photo} size="third" className="svc-photo">
                  <MaterialTag m={m} />
                </Chip>
                <div className="svc-body">
                  <h2>{s.title}</h2>
                  <p className="lede">{s.summary}</p>
                  <Checks items={s.includes} />
                  <dl className="facts">
                    <div>
                      <dt>preț de pornire{unit && `, ${unit}`}</dt>
                      <dd className="is-lead">de la {figure}</dd>
                    </div>
                    <div>
                      <dt>durată obișnuită</dt>
                      <dd>{s.duration}</dd>
                    </div>
                    <div>
                      <dt>garanție la manoperă</dt>
                      <dd>5 ani</dd>
                    </div>
                  </dl>
                  <div>
                    <Link className="btn" to="/oferta">
                      Cere deviz
                      <IconArrow size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="cum-lucram">
        <div className="wrap">
          <div className="head-row">
            <h2 id="cum-lucram">Cum lucrăm</h2>
            <div>
              <p className="muted">
                Etapa curentă și cea următoare sunt scrise în raportul de vineri, ca să știi mereu unde
                s-a ajuns.
              </p>
            </div>
          </div>
          <Schedule steps={processSteps} />
        </div>
      </section>

      <Closing
        title="Nu știi în ce categorie intră lucrarea ta?"
        text="Scrie-ne ce ai de făcut, în cuvintele tale. Noi o încadrăm și îți spunem cât durează și cât costă."
      />
    </>
  )
}
