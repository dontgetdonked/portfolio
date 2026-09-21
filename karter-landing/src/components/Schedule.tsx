import type { CSSProperties } from 'react'

type Step = { title: string; when: string; text: string }

/* The process as the execution schedule attached to the contract: one row per
   stage and a bar that shows where it falls in the order of work. The bars
   show sequence, not calendar length. */
const bars = [
  { from: 0, span: 14 },
  { from: 12, span: 16 },
  { from: 26, span: 12 },
  { from: 36, span: 50 },
  { from: 84, span: 16 },
]

export function Schedule({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="schedule">
      {steps.map((s, i) => (
        <li className="sch-row" key={s.title}>
          <span className="sch-n" aria-hidden>
            {i + 1}
          </span>
          <div className="sch-head">
            <h3>{s.title}</h3>
            <p className="sch-when">{s.when}</p>
          </div>
          <p className="sch-text">{s.text}</p>
          <div className="sch-track" aria-hidden>
            <span
              className="sch-bar"
              style={{ '--from': `${bars[i]?.from ?? 0}%`, '--span': `${bars[i]?.span ?? 20}%` } as CSSProperties}
            />
          </div>
        </li>
      ))}
    </ol>
  )
}
