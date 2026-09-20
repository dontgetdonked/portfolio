import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company } from '@/data/site'
import { IconClose, IconMenu, IconPhone } from '@/components/icons'

const nav = [
  { to: '/', label: 'Acasă', note: 'Ce facem, pe scurt' },
  { to: '/servicii', label: 'Servicii', note: 'Lucrări și prețuri de pornire' },
  { to: '/proiecte', label: 'Proiecte', note: 'Lucrări predate în Cluj' },
  { to: '/despre', label: 'Despre noi', note: 'Echipa și istoricul firmei' },
  { to: '/testimoniale', label: 'Testimoniale', note: 'Ce spun beneficiarii' },
  { to: '/contact', label: 'Contact', note: 'Sediu, program, hartă' },
]

function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <rect width="34" height="34" rx="2" fill="#10202b" />
      <path d="M8 25L17 8l9 17" stroke="#1d5fd6" strokeWidth="2.6" fill="none" strokeLinejoin="round" />
      <path d="M12.5 25h9" stroke="#edede9" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export function Header() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={stuck ? 'site-header is-stuck' : 'site-header'}>
        <div className="wrap header-in">
          <Link to="/" className="brand">
            <Logo />
            <span>
              ATRIUM Construct
              <small>Renovări și construcții, {company.city}</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Navigare principală">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-cta">
            <a className="header-phone" href={company.phoneHref}>
              {company.phone}
            </a>
            <Link className="btn btn-sm" to="/oferta">
              Cere ofertă
            </Link>
            <button className="burger" type="button" onClick={() => setOpen(true)} aria-expanded={open}>
              <IconMenu />
              Meniu
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Meniu">
          <div className="drawer-top">
            <Link to="/" className="brand" style={{ color: 'var(--cement)' }}>
              <Logo />
              <span>ATRIUM Construct</span>
            </Link>
            <button className="drawer-close" type="button" onClick={() => setOpen(false)}>
              <IconClose />
              Închide
            </button>
          </div>
          <nav className="drawer-nav" aria-label="Navigare">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
                <span>{item.note}</span>
              </NavLink>
            ))}
          </nav>
          <div className="drawer-foot">
            <Link className="btn btn-block" to="/oferta">
              Cere ofertă
            </Link>
            <a className="btn btn-quiet btn-block" href={company.phoneHref}>
              <IconPhone />
              {company.phone}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
