import { company, faq, whatsappLink } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'
import { Faq } from '@/components/Faq'
import { MapArt } from '@/components/Scene'
import { PageHead } from '@/components/ui'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from '@/components/icons'

export default function Contact() {
  return (
    <>
      <PageHead
        crumb="Contact"
        title="Sună, scrie sau treci pe la birou"
        lede="Răspundem la telefon între 08:00 și 18:00. Dacă sunăm noi înapoi, o facem în aceeași zi lucrătoare."
      />

      <section className="band">
        <div className="wrap contact-grid">
          <div className="stack">
            <div className="contact-lines">
              <div className="contact-line">
                <span>
                  <IconPhone size={15} /> Telefon
                </span>
                <b>
                  <a href={company.phoneHref}>{company.phone}</a>
                </b>
              </div>
              <div className="contact-line">
                <span>
                  <IconWhatsApp size={15} /> WhatsApp
                </span>
                <b>
                  <a href={whatsappLink('Bună ziua! Am o întrebare despre o lucrare.')} target="_blank" rel="noreferrer">
                    Scrie-ne direct
                  </a>
                </b>
              </div>
              <div className="contact-line">
                <span>
                  <IconMail size={15} /> E-mail
                </span>
                <b>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </b>
              </div>
              <div className="contact-line">
                <span>
                  <IconPin size={15} /> Sediu și depozit
                </span>
                <b>{company.address}</b>
              </div>
              <div className="contact-line">
                <span>
                  <IconClock size={15} /> Program
                </span>
                {company.hours.map((h) => (
                  <b key={h.day} style={{ fontWeight: 500, fontSize: '0.96rem' }}>
                    {h.day}: {h.time}
                  </b>
                ))}
              </div>
            </div>

            <div className="map">
              <MapArt />
            </div>
            <p className="small muted">
              Parcare în curte, intrarea dinspre Calea Baciului. Pentru vizite la sediu, sună cu o
              oră înainte: de multe ori suntem pe șantier.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="band band-plaster">
        <div className="wrap split-2">
          <div className="stack">
            <h2 style={{ fontSize: 'var(--step-3)' }}>Întrebări frecvente</h2>
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
