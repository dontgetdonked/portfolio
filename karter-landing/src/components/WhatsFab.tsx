import { Link } from 'react-router-dom'
import { company, whatsappLink } from '@/data/site'
import { IconPhone, IconWhatsApp } from '@/components/icons'

const opener =
  'Bună ziua! Aș vrea o ofertă pentru o lucrare de renovare. Vă scriu de pe site-ul ATRIUM Construct.'

/* On phones the three ways to reach the firm sit in a bar under the thumb;
   on wider screens only the WhatsApp tag stays pinned to the corner. */
export function WhatsFab() {
  return (
    <>
      <nav className="action-bar" aria-label="Contact rapid">
        <a href={company.phoneHref}>
          <IconPhone size={17} />
          Sună
        </a>
        <a href={whatsappLink(opener)} target="_blank" rel="noreferrer">
          <IconWhatsApp size={18} className="wa" />
          WhatsApp
        </a>
        <Link className="is-main" to="/oferta">
          Cere ofertă
        </Link>
      </nav>

      <a className="wa-float" href={whatsappLink(opener)} target="_blank" rel="noreferrer">
        <IconWhatsApp size={20} />
        Scrie pe WhatsApp
      </a>
    </>
  )
}
