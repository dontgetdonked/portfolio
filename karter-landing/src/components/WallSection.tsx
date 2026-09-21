import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Photo } from '@/components/ui'
import type { PhotoKey } from '@/data/media'

/* A wall sample cut in steps, the way a section drawing shows it: finish on
   the right, the masonry the crew finds on the left. One value, the depth
   (0 to 3), drives every edge, so the drag, the slider and the layer list
   all move the same cut. */

type Layer = { name: string; short: string; note: string; photo: PhotoKey; cls: string }

const layers: Layer[] = [
  {
    name: 'Finisaj: glet și vopsea',
    short: 'Finisaj',
    note: 'Ultimul strat și singurul pe care îl vezi la predare. Gletuim la nivel Q3, apoi zugrăvim.',
    photo: 'plaster',
    cls: 'is-finish',
  },
  {
    name: 'Tencuială',
    short: 'Tencuială',
    note: 'Tencuiala desprinsă o desfacem până la zidărie și o refacem. Nu o ascundem sub glet.',
    photo: 'concrete',
    cls: 'is-render',
  },
  {
    name: 'Instalații în perete',
    short: 'Instalații',
    note: 'Circuite separate pe consumatori și trasee de apă refăcute. La predare primești schema lor.',
    photo: 'grunge',
    cls: 'is-services',
  },
  {
    name: 'Zidăria găsită',
    short: 'Zidărie',
    note: 'Aici apar problemele ascunse. Nu turnăm peste ele: oprim lucrarea și primești act adițional cu prețul înainte să executăm.',
    photo: 'brick',
    cls: 'is-base',
  },
]

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/* Left edge of each layer, in % of the wall, at a given depth. */
function edge(i: number, d: number) {
  if (i === 3) return 0
  return 25 * clamp(d - i, 0, 3 - i)
}

/* Layer 3 is drawn as the installation scheme handed over at reception:
   routes, boxes and circuit labels, all kept between x 270 and 395 of the
   view box: the band this layer shows when the wall is fully peeled, on a
   wide wall and on a square phone wall alike. */
function Routes() {
  const label = { fontFamily: 'Sofia Sans Condensed Variable, sans-serif', fontWeight: 750, fontSize: 19 }
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g fill="none" strokeLinecap="square">
        <path d="M0 110H800M300 110V420M372 110V250" stroke="#f4f3ef" strokeWidth="7" />
        <path d="M0 530H800M345 530V400" stroke="#b5834a" strokeWidth="11" />
      </g>
      <g fill="#222426" stroke="#f4f3ef" strokeWidth="4">
        <rect x="281" y="420" width="38" height="38" />
        <rect x="353" y="250" width="38" height="38" />
      </g>
      <rect x="326" y="362" width="38" height="38" fill="#222426" stroke="#b5834a" strokeWidth="4" />
      <g style={label} fill="#f4f3ef">
        <text x="270" y="52">SCHEMA</text>
        <text x="270" y="76">LA PREDARE</text>
        <text x="310" y="190">C1 · prize</text>
        <text x="392" y="322" textAnchor="end">C2 · iluminat</text>
        <text x="281" y="488">doză</text>
      </g>
      <text x="392" y="578" textAnchor="end" style={label} fill="#e0b27c">
        apă rece
      </text>
    </svg>
  )
}

export function WallSection() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [depth, setDepth] = useState(reduced ? 3 : 0)
  const [animating, setAnimating] = useState(false)
  const wall = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const touched = useRef(false)
  const frame = useRef(0)

  const active = Math.min(3, Math.ceil(depth - 0.02))

  /* The one authored moment: the first time the wall is in view, the layers
     peel back on their own, then the visitor takes over. */
  useEffect(() => {
    if (reduced || !wall.current || typeof IntersectionObserver === 'undefined') return
    const el = wall.current
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || touched.current) return
        io.disconnect()
        const start = performance.now()
        const run = (now: number) => {
          if (touched.current) return
          const t = clamp((now - start) / 2200, 0, 1)
          const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          setDepth(eased * 3)
          if (t < 1) frame.current = requestAnimationFrame(run)
        }
        frame.current = requestAnimationFrame(run)
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [reduced])

  const takeOver = () => {
    touched.current = true
    cancelAnimationFrame(frame.current)
  }

  const fromPointer = useCallback((clientX: number) => {
    const box = wall.current?.getBoundingClientRect()
    if (!box) return
    setDepth(clamp(((clientX - box.left) / box.width) * 4, 0, 3))
  }, [])

  const jump = (i: number) => {
    takeOver()
    setAnimating(true)
    setDepth(i)
    window.setTimeout(() => setAnimating(false), 720)
  }

  return (
    <div className="peel">
      <div className="peel-copy">
        <h2 id="sectiune-titlu">Ce e sub finisaj</h2>
        <p className="lede">
          O renovare se judecă după straturile pe care nu le mai vezi la predare. Trage de linia
          albă sau alege un strat.
        </p>
        <div className="peel-layers" role="group" aria-label="Straturile peretelui">
          {layers.map((l, i) => (
            <button key={l.name} type="button" aria-pressed={active === i} onClick={() => jump(i)}>
              <span>{i + 1}</span>
              <b>{l.name}</b>
              <p>{l.note}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="peel-stage">
        <div
          ref={wall}
          className={animating ? 'wall is-animating' : 'wall'}
          onPointerDown={(e) => {
            takeOver()
            dragging.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            fromPointer(e.clientX)
          }}
          onPointerMove={(e) => {
            if (dragging.current) fromPointer(e.clientX)
          }}
          onPointerUp={(e) => {
            dragging.current = false
            e.currentTarget.releasePointerCapture(e.pointerId)
          }}
          onPointerCancel={() => {
            dragging.current = false
          }}
          aria-hidden
        >
          {[...layers].reverse().map((l) => {
            const i = layers.indexOf(l)
            const x = edge(i, depth)
            const next = i === 0 ? 100 : edge(i - 1, depth)
            const visible = next - x
            return (
              <div
                key={l.name}
                className={`wall-layer ${l.cls}`}
                style={{ '--x': `${x}%`, '--label': visible > 13 ? 1 : 0 } as CSSProperties}
              >
                <Photo name={l.photo} size="half" />
                {i === 2 && <Routes />}
                <span className="wall-name">
                  {i + 1} · {l.short}
                </span>
              </div>
            )
          })}
          <div className="wall-cut" style={{ '--cut': `${edge(0, depth)}%` } as CSSProperties}>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
              </svg>
            </span>
          </div>
        </div>

        <div className="depth">
          <label htmlFor="adancime">
            <span>Adâncimea desfacerii</span>
            <output htmlFor="adancime">{layers[active].name}</output>
          </label>
          <input
            id="adancime"
            type="range"
            min={0}
            max={300}
            step={1}
            value={Math.round(depth * 100)}
            style={{ '--fill': `${(depth / 3) * 100}%` } as CSSProperties}
            aria-valuetext={`Strat vizibil: ${layers[active].name}`}
            onChange={(e) => {
              takeOver()
              setDepth(Number(e.target.value) / 100)
            }}
          />
          <div className="depth-scale" aria-hidden>
            {layers.map((l, i) => (
              <span key={l.short} style={{ left: `${(i / 3) * 100}%` }}>
                {l.short}
              </span>
            ))}
          </div>
        </div>
        <p className="small muted">Mostră în secțiune, cu fotografii ilustrative de materiale.</p>
      </div>
    </div>
  )
}
