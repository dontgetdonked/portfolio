import { whatsappLink } from '@/data/site'
import { IconWhatsApp } from '@/components/icons'

const opener =
  'Bună ziua! Aș vrea o ofertă pentru o lucrare de renovare. Vă scriu de pe site-ul ATRIUM Construct.'

export function WhatsFab() {
  return (
    <a
      className="wa-float"
      href={whatsappLink(opener)}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
    >
      <IconWhatsApp size={22} />
      <span>Scrie pe WhatsApp</span>
    </a>
  )
}
