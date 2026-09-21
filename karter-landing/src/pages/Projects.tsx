import { useState } from 'react'
import { projectCategories, projects } from '@/data/site'
import { ProjectSheet } from '@/components/ProjectSheet'
import { Closing, PageHead, Tag } from '@/components/ui'

export default function Projects() {
  const [cat, setCat] = useState<string>('Toate')
  const list = cat === 'Toate' ? projects : projects.filter((p) => p.category === cat)

  return (
    <>
      <PageHead
        crumb="Proiecte"
        title="Lucrări predate, cu bugetele din contract"
        lede="Am ales șase lucrări care arată cum decurg proiectele noastre: ce am găsit pe șantier, ce am schimbat și cât a costat."
        photo="roomHall"
        tag={<Tag name="Hol cu parchet de stejar" spec="foto ilustrativă" />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Portofoliu">
        <div className="wrap">
          <div className="filter" role="group" aria-label="Filtrează după tipul lucrării">
            {projectCategories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          <p className="count" aria-live="polite">
            {list.length} {list.length === 1 ? 'lucrare afișată' : 'lucrări afișate'}
          </p>

          {list.length > 0 ? (
            <div className="sheets is-grid">
              {list.map((p) => (
                <ProjectSheet key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <p className="empty">Nu avem încă o lucrare publicată în această categorie.</p>
          )}
        </div>
      </section>

      <Closing
        title="Vrei o lucrare ca acestea?"
        text="Trimite-ne câteva detalii și primești un deviz construit pe aceleași prețuri ca proiectele de mai sus."
      />
    </>
  )
}
