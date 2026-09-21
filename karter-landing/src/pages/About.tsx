import { company, history, stats, team } from '@/data/site'
import { Checks, Closing, PageHead, Tag } from '@/components/ui'

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
        photo="plasterer"
        tag={<Tag name="Tencuire manuală" spec="foto ilustrativă" />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="de-ce">
        <div className="wrap split">
          <div className="stack">
            <h2 id="de-ce">De ce lucrăm cu oameni angajați</h2>
            <p>
              Un zilier bun costă mai puțin pe zi, dar dispare când apare o lucrare mai bine plătită,
              de obicei fix în săptămâna în care se gletuiește. Am pierdut două termene așa, în 2014,
              și am hotărât să nu se mai repete.
            </p>
            <p>
              Azi, cele patru echipe (structuri, instalații, finisaje și fațade) sunt ale noastre.
              Șeful de șantier care îți dă mâna la prima vizită este cel care predă lucrarea la final.
            </p>
          </div>
          <div className="stack">
            <h3>Patru reguli pe care nu le negociem</h3>
            <Checks items={rules} />
            <dl className="card-table" style={{ marginTop: 12 }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
              <div>
                <dt>Nr. Registrul Comerțului</dt>
                <dd>{company.reg}</dd>
              </div>
              <div>
                <dt>Cod fiscal</dt>
                <dd>{company.cui}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="echipa">
        <div className="wrap">
          <div className="head-row">
            <h2 id="echipa">Cine răspunde de lucrarea ta</h2>
            <div>
              <p className="muted">
                Patru oameni coordonează toate șantierele. Pe cel care îți deschide lucrarea îl cunoști
                la prima vizită.
              </p>
            </div>
          </div>
          <ul className="roster">
            {team.map((m) => (
              <li key={m.name}>
                <b>{m.name}</b>
                <span>{m.role}</span>
                <span>În echipă {m.since}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="istoric">
        <div className="wrap">
          <div className="head-row">
            <h2 id="istoric">Cum am ajuns aici</h2>
            <div>
              <p className="muted">Cincisprezece ani, de la două echipe de finisaje la patru departamente.</p>
            </div>
          </div>
          <div className="timeline">
            {history.map((h) => (
              <div className="tl-row" key={h.year}>
                <b>{h.year}</b>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 24 }}>
            Sediul și depozitul: {company.address}. Punct de lucru deschis pentru clienți în intervalul{' '}
            {company.hours[0].time}.
          </p>
        </div>
      </section>

      <Closing />
    </>
  )
}
