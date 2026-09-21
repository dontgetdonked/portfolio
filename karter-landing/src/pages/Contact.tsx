import { company, faq, whatsappLink } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'
import { Faq } from '@/components/Faq'
import { PageHead, Tag } from '@/components/ui'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from '@/components/icons'

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`

export default function Contact() {
  return (
    <>
      <PageHead
        crumb="Contact"
        title="Sună, scrie sau treci pe la birou"
        lede="Răspundem la telefon între 08:00 și 18:00. Dacă sunăm noi înapoi, o facem în aceeași zi lucrătoare."
        photo="studio"
        tag={<Tag name="Birou de proiectare" spec="foto ilustrativă" />}
      />

      <section className="section" style={{ paddingTop: 0 }} aria-label="Date de contact">
        <div className="wrap two-col">
          <div className="stack">
            <div className="lines">
              <div className="line">
                <span>
                  <IconPhone size={15} /> Telefon
                </span>
                <a href={company.phoneHref}>{company.phone}</a>
              </div>
              <div className="line">
                <span>
                  <IconWhatsApp size={15} /> WhatsApp
                </span>
                <a href={whatsappLink('Bună ziua! Am o întrebare despre o lucrare.')} target="_blank" rel="noreferrer">
                  Scrie-ne direct
                </a>
              </div>
              <div className="line">
                <span>
                  <IconMail size={15} /> E-mail
                </span>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
              <div className="line">
                <span>
                  <IconPin size={15} /> Sediu și depozit
                </span>
                <a href={mapsLink} target="_blank" rel="noreferrer">
                  {company.address}
                </a>
              </div>
              <div className="line">
                <span>
                  <IconClock size={15} /> Program
                </span>
                <dl className="hours">
                  {company.hours.map((h) => (
                    <div key={h.day} style={{ display: 'contents' }}>
                      <dt>{h.day}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <p className="small muted">
              Parcare în curte, intrarea dinspre Calea Baciului. Pentru vizite la sediu, sună cu o oră
              înainte: de multe ori suntem pe șantier.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section field-sunk" aria-labelledby="intrebari">
        <div className="wrap split">
          <div className="stack">
            <h2 id="intrebari">Întrebări frecvente</h2>
            <p className="lede">
              Răspunsurile de aici sunt aceleași pe care le dăm la telefon. Dacă mai rămâne ceva
              neclar, întreabă-ne direct.
            </p>
          </div>
          <Faq items={faq} />
        </div>
      </section>
    </>
  )
}
