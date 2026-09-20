import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectCategories, projects } from '@/data/site'
import { Scene } from '@/components/Scene'
import { CtaBand, PageHead } from '@/components/ui'

export default function Projects() {
  const [cat, setCat] = useState<string>('Toate')
  const list = cat === 'Toate' ? projects : projects.filter((p) => p.category === cat)

  return (
    <>
      <PageHead
        crumb="Proiecte"
        title="Lucrări predate, cu bugetele și termenele din contract"
        lede="Am ales șase lucrări care arată cum decurg proiectele noastre: ce am găsit pe șantier, ce am schimbat și cât a costat."
      />

      <section className="band">
        <div className="wrap">
          <div className="proj-filter" role="group" aria-label="Filtrează după tipul lucrării">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="small muted" style={{ marginBottom: 24 }} aria-live="polite">
            {list.length} {list.length === 1 ? 'lucrare afișată' : 'lucrări afișate'}
          </p>

          {list.map((p) => (
            <article className="proj-strip" key={p.slug}>
              <div className="proj-art">
                <Scene variant={p.scene} state="after" />
              </div>
              <div className="proj-body">
                <p className="proj-where">
                  {p.category} în {p.place}, {p.year}
                </p>
                <h2 style={{ fontSize: 'var(--step-3)' }}>{p.title}</h2>
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

      <CtaBand
        title="Vrei o lucrare ca acestea?"
        text="Trimite-ne câteva detalii și primești un deviz construit pe aceleași prețuri ca proiectele de mai sus."
      />
    </>
  )
}
