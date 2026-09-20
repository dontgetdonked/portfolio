import { useState } from 'react'
import { IconPlus } from '@/components/icons'

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className="faq-item" key={item.q}>
            <h3>
              <button
                className="faq-q"
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq-mark" aria-hidden>
                  <IconPlus />
                </span>
              </button>
            </h3>
            <div className={isOpen ? 'faq-a is-open' : 'faq-a'} id={`faq-${i}`} role="region">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
