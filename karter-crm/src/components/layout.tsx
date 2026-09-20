import { useState, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useStore } from '@/store/store'
import { useTheme } from '@/store/theme'
import { Avatar, Popover } from '@/components/ui'
import { ROLE_LABEL } from '@/types'
import {
  IconCalendar,
  IconClients,
  IconConversations,
  IconDashboard,
  IconInvoices,
  IconLeads,
  IconLogo,
  IconMenu,
  IconMoon,
  IconNotes,
  IconPipeline,
  IconRefresh,
  IconSettings,
  IconSun,
  IconTasks,
  IconUsers,
  type IconProps,
} from '@/components/icons'

interface NavEntry {
  to: string
  label: string
  icon: (props: IconProps) => JSX.Element
  count?: number
}

export function AppLayout() {
  const { state, currentUser, can, resetDemo } = useStore()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const openLeads = state.leads.filter((l) => l.status !== 'castigat' && l.status !== 'pierdut')
  const myOpenTasks = state.tasks.filter((t) => !t.done && t.assigneeId === currentUser.id)
  const unpaid = state.documents.filter(
    (d) => d.kind === 'factura' && (d.status === 'trimis' || d.status === 'restant'),
  )

  const groups: { label: string; items: NavEntry[] }[] = [
    {
      label: 'Vânzări',
      items: [
        { to: '/', label: 'Dashboard', icon: IconDashboard },
        { to: '/clienti', label: 'Clienți', icon: IconClients, count: state.clients.length },
        { to: '/lead-uri', label: 'Lead-uri', icon: IconLeads, count: openLeads.length },
        { to: '/pipeline', label: 'Pipeline', icon: IconPipeline },
      ],
    },
    {
      label: 'Operațional',
      items: [
        { to: '/task-uri', label: 'Task-uri', icon: IconTasks, count: myOpenTasks.length },
        { to: '/calendar', label: 'Calendar', icon: IconCalendar },
        { to: '/note', label: 'Note', icon: IconNotes },
        { to: '/conversatii', label: 'Conversații', icon: IconConversations },
      ],
    },
    {
      label: 'Financiar',
      items: [
        { to: '/documente', label: 'Facturi și oferte', icon: IconInvoices, count: unpaid.length },
      ],
    },
    {
      label: 'Administrare',
      items: [
        ...(can('users.manage')
          ? [{ to: '/utilizatori', label: 'Utilizatori', icon: IconUsers, count: state.users.length }]
          : []),
        { to: '/setari', label: 'Setări', icon: IconSettings },
      ],
    },
  ]

  return (
    <div className="app">
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}

      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <span className="brand-mark">
            <IconLogo size={19} />
          </span>
          <span>
            <span className="brand-name">Karter CRM</span>
            <br />
            <span className="brand-sub">Construcții & servicii</span>
          </span>
        </div>

        <nav style={{ overflowY: 'auto', flex: 1 }} onClick={() => setMenuOpen(false)}>
          {groups.map((group) => (
            <div key={group.label}>
              <div className="nav-group-label">{group.label}</div>
              {group.items.map(({ to, label, icon: Icon, count }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                  {count !== undefined && count > 0 && <span className="nav-count">{count}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <UserSwitcher />
          <button className="nav-item" style={{ width: '100%' }} onClick={resetDemo}>
            <IconRefresh size={16} />
            <span className="small">Resetează datele demo</span>
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button
            className="btn-icon sidebar-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Meniu"
          >
            <IconMenu size={20} />
          </button>

          <Breadcrumb pathname={location.pathname} />

          <div style={{ marginLeft: 'auto' }} className="row">
            <button
              className="btn-icon"
              onClick={toggle}
              aria-label={theme === 'light' ? 'Comută pe temă închisă' : 'Comută pe temă deschisă'}
              title={theme === 'light' ? 'Temă închisă' : 'Temă deschisă'}
            >
              {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
            </button>
            <Avatar user={currentUser} />
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  )
}

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/clienti': 'Clienți',
  '/lead-uri': 'Lead-uri',
  '/pipeline': 'Pipeline',
  '/task-uri': 'Task-uri',
  '/calendar': 'Calendar',
  '/note': 'Note',
  '/conversatii': 'Istoric conversații',
  '/documente': 'Facturi și oferte',
  '/utilizatori': 'Utilizatori și roluri',
  '/setari': 'Setări',
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const base = `/${pathname.split('/')[1] ?? ''}`
  const title = TITLES[pathname] ?? TITLES[base] ?? 'Karter CRM'
  return <span style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</span>
}

function UserSwitcher() {
  const { state, currentUser, dispatch } = useStore()

  return (
    <Popover
      width={236}
      trigger={({ toggle }) => (
        <button className="user-switcher" onClick={toggle}>
          <Avatar user={currentUser} />
          <span className="grow truncate">
            <span style={{ fontWeight: 600, display: 'block' }} className="truncate">
              {currentUser.name}
            </span>
            <span className="small muted">{ROLE_LABEL[currentUser.role]}</span>
          </span>
        </button>
      )}
    >
      {(close) => (
        <>
          <div className="popover-label">Schimbă utilizatorul</div>
          {state.users
            .filter((u) => u.active)
            .map((user) => (
              <button
                key={user.id}
                className="popover-item"
                onClick={() => {
                  dispatch({ type: 'switchUser', userId: user.id })
                  close()
                }}
              >
                <Avatar user={user} size="sm" />
                <span className="grow truncate">
                  <span style={{ fontWeight: 550, display: 'block' }}>{user.name}</span>
                  <span className="small muted">{ROLE_LABEL[user.role]}</span>
                </span>
              </button>
            ))}
        </>
      )}
    </Popover>
  )
}

export function Page({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <main className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-sub">{subtitle}</p>}
        </div>
        {actions && <div className="row">{actions}</div>}
      </div>
      {children}
    </main>
  )
}
