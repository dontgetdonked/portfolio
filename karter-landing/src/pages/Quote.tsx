import { company, processSteps } from '@/data/site'
import { QuoteForm } from '@/components/QuoteForm'
import { Checklist, PageHead } from '@/components/ui'

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
      />

      <section className="band">
        <div className="wrap contact-grid">
          <div className="stack">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Ce conține devizul</h2>
            <Checklist items={contains} />
            <p className="small muted">
              Devizul este gratuit și nu te obligă la nimic. Dacă alegi altă firmă, rămâne al tău.
            </p>

            <div className="contact-lines" style={{ marginTop: 12 }}>
              {processSteps.slice(0, 3).map((s, i) => (
                <div className="contact-line" key={s.title}>
                  <span>Pasul {i + 1}, {s.when.toLowerCase()}</span>
                  <b style={{ fontSize: '1rem' }}>{s.title}</b>
                </div>
              ))}
            </div>

            <p className="small muted">
              Preferi să vorbești? Sună la{' '}
              <a className="link-u" href={company.phoneHref}>
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
