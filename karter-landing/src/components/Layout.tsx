import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsFab } from '@/components/WhatsFab'

export function Layout() {
  const { pathname, hash } = useLocation()

  /* A new page starts at the top; a link with an anchor (the footer's service
     links) lands on that entry instead. */
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#main">
        Sari la conținut
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsFab />
    </>
  )
}
