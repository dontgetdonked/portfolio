import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import {
  company,
  faq,
  processSteps,
  projects,
  promises,
  reviewStats,
  services,
  testimonials,
  whatsappLink,
} from '@/data/site'
import { materials } from '@/data/media'
import { Faq } from '@/components/Faq'
import { WallSection } from '@/components/WallSection'
import { ProjectSheet } from '@/components/ProjectSheet'
import { PriceList } from '@/components/PriceList'
import { Schedule } from '@/components/Schedule'
import { CallLink, Chip, Closing, MaterialTag, More, Photo, Rating, Tag } from '@/components/ui'
import { IconArrow, IconWhatsApp } from '@/components/icons'

const featured = projects.filter((p) => p.featured)
const apartment = services[0]
/* The review pinned to the projects board is the one that did not give five
   stars, because it says why. */
const pinned = testimonials.find((t) => t.rating < 5) ?? testimonials[0]

/* The figure each clause is remembered by. */
const clauseFigures = ['3 zile', 'Fix', '26', '5 ani']

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap board hero-board">
          <div className="chip hero-plaster">
            <Photo name="plaster" size="half" eager />
            <h1 id="hero-title">Renovări duse până la capăt, nu lăsate la 90%.</h1>
            <p className="lede">
              Renovăm apartamente, construim case și amenajăm spații comerciale în Cluj. Un contract
              pentru toată lucrarea, aceeași echipă de la demolare la recepție și un deviz în care
              vezi fiecare poziție.
            </p>
            <div className="actions">
              <Link className="btn" to="/oferta">
                Cere ofertă
                <IconArrow size={16} />
              </Link>
              <a
                className="btn btn-line"
                href={whatsappLink('Bună ziua! Aș vrea o estimare pentru o renovare.')}
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsApp className="wa" />
                <span>
                  <span className="hide-sm">Scrie pe </span>WhatsApp
                </span>
              </a>
            </div>
            <p className="hero-note">
              {company.city} și 60 km împrejur. Vizita și măsurătorile sunt gratuite, iar avans nu
              cerem înainte de semnarea contractului.
            </p>
            <MaterialTag m={materials.plaster} className="is-right" />
          </div>

          <Chip material="oak" className="hero-chip c-oak" eager style={{ '--i': 0 } as CSSProperties} />
          <Chip material="stone" className="hero-chip c-stone" eager style={{ '--i': 1 } as CSSProperties} />
          <Chip material="tile" className="hero-chip c-tile" eager style={{ '--i': 2 } as CSSProperties} />
          <Chip material="brick" className="hero-chip c-brick" eager style={{ '--i': 3 } as CSSProperties}>
            <a href="#sectiune" className="chip-go">
              <span className="sr-only">Vezi ce găsim sub finisaj</span>
              <span className="chip-go-mark" aria-hidden>
                <IconArrow size={16} />
              </span>
            </a>
            <Tag code={materials.brick.code} name="Ce e sub finisaj" />
          </Chip>

          <p className="price-tag">
            <span>
              {apartment.title}: <strong>{apartment.price}</strong>
            </span>
            <span>deviz pe poziții în 3 zile lucrătoare</span>
            <span>garanție 5 ani la manoperă</span>
          </p>
        </div>
      </section>

      <section className="section" id="sectiune" aria-labelledby="sectiune-titlu" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <WallSection />
        </div>
      </section>

      <section className="section field-dark" aria-labelledby="clauze">
        <div className="wrap clauses">
          <div className="clauses-copy">
            <h2 id="clauze">Ce scriem în fiecare contract</h2>
            <p className="lede">
              Patru clauze care nu se negociază, de la o baie de 6 mp până la o casă întreagă.
            </p>
          </div>
          <dl className="spec">
            {promises.map((p, i) => (
              <div key={p.title}>
                <dt>{clauseFigures[i]}</dt>
                <dd>
                  <b>{p.title}</b>
                  <p>{p.text}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="servicii">
        <div className="wrap">
          <h2 id="servicii" className="list-title">
            Servicii și prețuri de pornire
          </h2>
          <PriceList />
          <div className="list-foot">
            <p className="small muted">
              Prețurile sunt punctele de pornire din 2026, cu materiale de gamă medie. Codul din
              stânga e mostra de pe placă. Devizul final îl primești după măsurători.
            </p>
            <More to="/servicii">Ce include fiecare serviciu</More>
          </div>
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="lucrari">
        <div className="wrap">
          <div className="head-row">
            <h2 id="lucrari">Lucrări recente din Cluj</h2>
            <div>
              <p className="muted">
                Trei dintre cele 318 lucrări predate din 2011. Bugetul și durata sunt cele din
                contract; fotografiile sunt ilustrative.
              </p>
              <More to="/proiecte">Deschide portofoliul complet</More>
            </div>
          </div>
          <div className="sheets is-feature">
            {featured.map((p, i) => (
              <ProjectSheet key={p.slug} project={p} lead={i === 0} />
            ))}
            <figure className="voice is-pinned">
              <div className="voice-top">
                <Rating value={pinned.rating} />
                <More to="/testimoniale">
                  Toate cele {reviewStats.count} recenzii, media {reviewStats.average}
                </More>
              </div>
              <blockquote>{pinned.text}</blockquote>
              <figcaption>
                <b>{pinned.name}</b>
                <span>{pinned.role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="grafic">
        <div className="wrap process">
          <div className="process-copy">
            <h2 id="grafic">De la primul telefon la cheia predată</h2>
            <p className="lede">
              Cinci etape, fiecare cu termenul ei. Dacă îl depășim noi, plătim penalizare, la fel ca
              tine dacă întârzii o tranșă.
            </p>
          </div>
          <Schedule steps={processSteps} />
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="intrebari">
        <div className="wrap split">
          <div className="stack">
            <h2 id="intrebari">Întrebări pe care le primim săptămânal</h2>
            <p className="lede">
              Dacă nu găsești răspunsul aici, sună-ne. Nu trimitem la formular oamenii care vor să
              vorbească cu cineva.
            </p>
            <CallLink />
          </div>
          <Faq items={faq.slice(0, 4)} />
        </div>
      </section>

      <Closing />
    </>
  )
}
