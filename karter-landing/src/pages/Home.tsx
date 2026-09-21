import { Link } from 'react-router-dom'
import {
  company,
  faq,
  processSteps,
  projects,
  promises,
  services,
  stats,
  testimonials,
  whatsappLink,
} from '@/data/site'
import { BeforeAfter } from '@/components/BeforeAfter'
import { Scene } from '@/components/Scene'
import { Faq } from '@/components/Faq'
import { CtaBand, Ledger, Opener, Stars } from '@/components/ui'
import { IconWhatsApp } from '@/components/icons'

const hero = projects[0]
const featured = projects.filter((p) => p.featured)

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy seq">
            <p className="hero-where">
              <i />
              {company.city} și 60 km împrejur
            </p>
            <h1>Renovări duse până la capăt, nu lăsate la 90%.</h1>
            <p className="lede">
              Renovăm apartamente, construim case și amenajăm spații comerciale în Cluj. Un contract
              pentru toată lucrarea, aceeași echipă de la demolare la recepție și un deviz în care
              vezi fiecare poziție.
            </p>
            <div className="hero-actions">
              <Link className="btn" to="/oferta">
                Cere ofertă
              </Link>
              <a
                className="btn btn-whats"
                href={whatsappLink('Bună ziua! Aș vrea o estimare pentru o renovare.')}
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsApp />
                Scrie pe WhatsApp
              </a>
              <Link className="btn btn-quiet" to="/proiecte">
                Vezi lucrări predate
              </Link>
            </div>
            <p className="small muted">
              Vizita și măsurătorile sunt gratuite. Nu cerem avans înainte de semnarea contractului.
            </p>
          </div>

          <div>
            <BeforeAfter
              variant={hero.scene}
              beforeNote={hero.beforeNote}
              afterNote={hero.afterNote}
              caption={`${hero.title}, ${hero.surface}`}
              meta={`${hero.duration} de lucru, ${hero.budget}`}
            />
          </div>
        </div>

        <div className="wrap">
          <Ledger items={stats} />
        </div>
      </section>

      <section className="band band-tight">
        <div className="wrap">
          <Opener
            title="Ce scriem în fiecare contract"
            text="Patru clauze care nu se negociază, de la o baie de 6 mp până la o casă întreagă."
          />
          <ul className="terms">
            {promises.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-plaster">
        <div className="wrap">
          <Opener
            title="Servicii"
            text="Prețurile de mai jos sunt punctele de pornire din 2026, cu materiale de gamă medie. Devizul final îl primești după măsurători."
            measure={`${services.length} categorii de lucrări, toate executate de echipele noastre.`}
            aside={
              <Link className="link-u" to="/servicii">
                Vezi ce include fiecare serviciu
              </Link>
            }
          />
          <div className="svc-list">
            {services.map((s) => (
              <article className="svc-row" key={s.slug}>
                <h3>{s.title}</h3>
                <div>
                  <p>{s.summary}</p>
                  <div className="svc-tags">
                    {s.includes.slice(0, 2).map((i) => (
                      <span className="tag" key={i}>
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="svc-meta">
                  <span className="svc-price">{s.price}</span>
                  <span className="small muted">{s.duration}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Opener
            title="Lucrări recente din Cluj"
            text="Fiecare lucrare are bugetul și durata reale, așa cum au fost în contract."
            measure="Trei dintre cele 318 lucrări predate din 2011 încoace."
            aside={
              <Link className="link-u" to="/proiecte">
                Deschide portofoliul complet
              </Link>
            }
          />
          {featured.map((p) => (
            <article className="proj-strip" key={p.slug}>
              <div className="proj-art">
                <Scene variant={p.scene} state="after" />
              </div>
              <div className="proj-body">
                <p className="proj-where">
                  {p.place}, {p.year}
                </p>
                <h3>{p.title}</h3>
                <p className="muted">{p.intro}</p>
                <div className="proj-specs">
                  <div>
                    <b>{p.surface}</b>
                    <span>suprafață</span>
                  </div>
                  <div>
                    <b>{p.duration}</b>
                    <span>durata lucrării</span>
                  </div>
                  <div>
                    <b>{p.budget}</b>
                    <span>valoare contract</span>
                  </div>
                </div>
                <Link className="link-u" to={`/proiecte/${p.slug}`} style={{ justifySelf: 'start' }}>
                  Vezi lucrarea în detaliu
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-dark">
        <div className="wrap">
          <Opener
            title="De la primul telefon la cheia predată"
            text="Sunt cinci etape și fiecare are un termen. Dacă îl depășim noi, plătim penalizare, la fel ca tine dacă întârzii o tranșă."
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

      <section className="band band-plaster">
        <div className="wrap">
          <Opener
            title="Ce spun oamenii după recepție"
            measure="Media este 4,9 din 5, pe 112 recenzii."
            aside={
              <Link className="link-u" to="/testimoniale">
                Citește toate testimonialele
              </Link>
            }
          />
          <div className="quote-grid">
            {testimonials.slice(0, 3).map((t) => (
              <figure className="quote-card" key={t.name}>
                <Stars value={t.rating} />
                <blockquote>{t.text}</blockquote>
                <figcaption className="who">
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap split-2">
          <div className="stack">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Întrebări pe care le primim săptămânal</h2>
            <p className="lede">
              Dacă nu găsești răspunsul aici, sună-ne. Nu trimitem la formular oamenii care vor să
              vorbească cu cineva.
            </p>
            <a className="btn btn-quiet" href={company.phoneHref} style={{ justifySelf: 'start' }}>
              {company.phone}
            </a>
          </div>
          <Faq items={faq.slice(0, 4)} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
