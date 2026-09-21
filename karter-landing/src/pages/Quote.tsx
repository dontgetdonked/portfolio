import { company, processSteps } from '@/data/site'
import { materials } from '@/data/media'
import { QuoteForm } from '@/components/QuoteForm'
import { Checks, MaterialTag, PageHead } from '@/components/ui'

const contains = [
  'Manopera, defalcată pe cameră și pe meserie',
  'Materialele, cu marcă, cantitate și preț unitar',
  'Graficul de execuție, cu data de început și de predare',
  'Ce nu este inclus, scris explicit, ca să nu apară la final',
]

export default function Quote() {
  return (
    <>
      <PageHead
        crumb="Cere ofertă"
        title="Spune-ne ce ai de făcut și primești devizul în trei zile"
        lede="Formularul are trei pași și durează sub două minute. După ce îl trimiți, te sunăm ca să stabilim vizita de măsurare."
        photo="oak"
        tag={<MaterialTag m={materials.oak} />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Formular de ofertă">
        <div className="wrap two-col">
          <div className="stack">
            <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)' }}>Ce conține devizul</h2>
            <Checks items={contains} />
            <p className="small muted">
              Devizul este gratuit și nu te obligă la nimic. Dacă alegi altă firmă, rămâne al tău.
            </p>

            <div className="lines" style={{ marginTop: 12 }}>
              {processSteps.slice(0, 3).map((s, i) => (
                <div className="line" key={s.title}>
                  <span>
                    Pasul {i + 1}, {s.when.toLowerCase()}
                  </span>
                  <b>{s.title}</b>
                </div>
              ))}
            </div>

            <p className="small muted">
              Preferi să vorbești? Sună la{' '}
              <a className="link" href={company.phoneHref}>
                {company.phone}
              </a>
              , de luni până vineri, între 08:00 și 18:00.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  )
}
