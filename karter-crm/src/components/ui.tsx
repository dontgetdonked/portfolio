import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SelectHTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'
import { IconClose, IconSearch, type IconProps } from '@/components/icons'
import type { User } from '@/types'

/* --------------------------------- avatar --------------------------------- */

export function Avatar({
  user,
  size = 'md',
  title,
}: {
  user: Pick<User, 'initials' | 'color' | 'name'> | undefined
  size?: 'sm' | 'md' | 'lg'
  title?: string
}) {
  if (!user) return null
  const cls = size === 'sm' ? 'avatar avatar-sm' : size === 'lg' ? 'avatar avatar-lg' : 'avatar'
  return (
    <span className={cls} style={{ background: user.color }} title={title ?? user.name}>
      {user.initials}
    </span>
  )
}

export function AvatarStack({ users, max = 3 }: { users: User[]; max?: number }) {
  const shown = users.slice(0, max)
  const rest = users.length - shown.length
  return (
    <span className="avatar-stack">
      {shown.map((u) => (
        <Avatar key={u.id} user={u} size="sm" />
      ))}
      {rest > 0 && (
        <span className="avatar avatar-sm" style={{ background: 'var(--text-3)' }}>
          +{rest}
        </span>
      )}
    </span>
  )
}

/* --------------------------------- badge ---------------------------------- */

type Tone = 'neutral' | 'success' | 'warn' | 'danger' | 'info' | 'accent'

export function Badge({
  children,
  tone = 'neutral',
  dot,
  dotColor,
}: {
  children: ReactNode
  tone?: Tone
  dot?: boolean
  dotColor?: string
}) {
  const cls = tone === 'neutral' ? 'badge' : `badge badge-${tone}`
  return (
    <span className={cls}>
      {dot && <span className="badge-dot" style={dotColor ? { background: dotColor } : undefined} />}
      {children}
    </span>
  )
}

/* ---------------------------------- card ---------------------------------- */

export function Card({
  title,
  action,
  children,
  padded = true,
  className = '',
}: {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  padded?: boolean
  className?: string
}) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && (
        <header className="card-head">
          <h2 className="card-title">{title}</h2>
          {action}
        </header>
      )}
      {padded ? <div className="card-body">{children}</div> : children}
    </section>
  )
}

/* --------------------------------- fields --------------------------------- */

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="small muted">{hint}</span>}
    </label>
  )
}

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`input ${props.className ?? ''}`} />
)

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`textarea ${props.className ?? ''}`} />
)

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`select ${props.className ?? ''}`} />
)

export function SearchInput({
  value,
  onChange,
  placeholder = 'Caută…',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="search">
      <IconSearch size={15} />
      <input
        className="input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

/* --------------------------------- modal ---------------------------------- */

export function Modal({
  title,
  onClose,
  children,
  footer,
  wide,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return createPortal(
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={wide ? 'modal modal-lg' : 'modal'}>
        <header className="modal-head">
          <h2 className="modal-title">{title}</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Închide">
            <IconClose size={17} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-foot">{footer}</footer>}
      </div>
    </div>,
    document.body,
  )
}

/* -------------------------------- popover --------------------------------- */

export function Popover({
  trigger,
  children,
  align = 'left',
  width,
}: {
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode
  children: (close: () => void) => ReactNode
  align?: 'left' | 'right'
  width?: number
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          className="popover"
          style={{
            top: 'calc(100% + 6px)',
            [align]: 0,
            width,
          }}
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------- empty state ------------------------------ */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: (props: IconProps) => JSX.Element
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <Icon size={38} />
      </span>
      <p className="empty-title">{title}</p>
      {description && <p className="small" style={{ maxWidth: 380 }}>{description}</p>}
      {action}
    </div>
  )
}

/* --------------------------------- tabs ----------------------------------- */

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: T; label: string; count?: number }[]
  active: T
  onChange: (id: T) => void
}) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === active}
          className={tab.id === active ? 'tab active' : 'tab'}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className="muted"> ({tab.count})</span>}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------- confirm ---------------------------------- */

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Șterge',
  onConfirm,
  onCancel,
}: {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="btn" onClick={onCancel}>
            Anulează
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="muted">{message}</p>
    </Modal>
  )
}
