import { company, history, stats, team } from '@/data/site'
import { Portrait } from '@/components/Scene'
import { Checklist, CtaBand, Opener, PageHead } from '@/components/ui'

const rules = [
  'Nu începem o lucrare fără contract semnat și grafic de execuție.',
  'Nu turnăm peste o problemă ascunsă. Oprim și o rezolvăm cu tine.',
  'Nu punem mai mult de două lucrări pe o echipă, în paralel.',
  'Nu cerem plata finală înainte de remedierea listei de observații.',
]

export default function About() {
  return (
    <>
      <PageHead
        crumb="Despre noi"
        title="O firmă de execuție din Cluj, cu 26 de oameni angajați"
        lede="Am început în 2011 cu două echipe de finisaje. Am crescut adăugând meseriile pe care le subcontractam, pentru că acolo pierdeam controlul termenelor."
      />

      <section className="band">
        <div className="wrap split-2">
          <div className="stack">
            <h2 style={{ fontSize: 'var(--step-3)' }}>De ce lucrăm cu oameni angajați</h2>
            <p>
              Un zilier bun costă mai puțin pe zi, dar dispare când apare o lucrare mai bine plătită,
              de obicei fix în săptămâna în care se gletuiește. Am pierdut două termene așa, în 2014,
              și am hotărât să nu se mai repete.
            </p>
            <p>
              Azi, cele patru echipe — structuri, instalații, finisaje și fațade — sunt ale noastre.
              Șeful de șantier care îți dă mâna la prima vizită este cel care predă lucrarea la final.
            </p>
          </div>
          <div className="stack">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Patru reguli pe care nu le negociem</h2>
            <Checklist items={rules} />
          </div>
        </div>
      </section>

      <section className="band band-dark band-tight">
        <div className="wrap">
          <div className="hero-facts" style={{ marginTop: 0, background: 'transparent', borderColor: 'var(--line-dark)' }}>
            {stats.map((s) => (
              <div className="hero-fact" key={s.label} style={{ background: 'transparent' }}>
                <b>{s.value}</b>
                <span style={{ color: 'rgba(237,237,233,0.66)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-plaster">
        <div className="wrap">
          <Opener measure="Cine răspunde de lucrarea ta" title="Echipa de coordonare" />
          <div className="team">
            {team.map((m, i) => (
              <article className="member" key={m.name}>
                <Portrait seed={i} />
                <div>
                  <b>{m.name}</b>
                  <span>{m.role}</span>
                  <span>În echipă {m.since}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Opener measure="15 ani de firmă" title="Cum am ajuns aici" />
          <div className="timeline">
            {history.map((h) => (
              <div className="tl-row" key={h.year}>
                <b>{h.year}</b>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 24 }}>
            Sediul și depozitul: {company.address}. Punct de lucru deschis pentru clienți în
            intervalul {company.hours[0].time}.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
