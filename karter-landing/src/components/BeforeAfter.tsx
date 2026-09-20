import { useCallback, useRef, useState } from 'react'
import type { SceneVariant } from '@/data/site'
import { Scene } from '@/components/Scene'
import { IconDrag } from '@/components/icons'

type Props = {
  variant: SceneVariant
  beforeNote: string
  afterNote: string
  caption?: string
  meta?: string
}

/* Drag, or use the arrow keys on the slider underneath: both drive the same
   split value, so the control is usable without a pointer. */
export function BeforeAfter({ variant, beforeNote, afterNote, caption, meta }: Props) {
  const [split, setSplit] = useState(48)
  const stage = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const moveTo = useCallback((clientX: number) => {
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    const pct = ((clientX - box.left) / box.width) * 100
    setSplit(Math.min(96, Math.max(4, pct)))
  }, [])

  return (
    <figure className="ba" style={{ margin: 0 }}>
      <div
        ref={stage}
        className="ba-stage"
        style={{ ['--split' as string]: `${split}%` }}
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          moveTo(e.clientX)
        }}
        onPointerMove={(e) => {
          if (dragging.current) moveTo(e.clientX)
        }}
        onPointerUp={(e) => {
          dragging.current = false
          e.currentTarget.releasePointerCapture(e.pointerId)
        }}
      >
        <div className="ba-layer">
          <Scene variant={variant} state="before" />
        </div>
        <div className="ba-layer is-after">
          <Scene variant={variant} state="after" />
        </div>
        <span className="ba-tag left">Înainte</span>
        <span className="ba-tag right">După</span>
        <div className="ba-handle" aria-hidden>
          <span className="ba-knob">
            <IconDrag />
          </span>
        </div>
        <input
          className="ba-range"
          type="range"
          min={4}
          max={96}
          value={Math.round(split)}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Mută linia dintre starea inițială și lucrarea finalizată"
        />
      </div>
      <figcaption className="ba-caption">
        <span>
          <b>Înainte:</b> {beforeNote}
        </span>
        <span>
          <b>După:</b> {afterNote}
        </span>
        {caption && <span>{caption}</span>}
        {meta && <span>{meta}</span>}
      </figcaption>
    </figure>
  )
}
