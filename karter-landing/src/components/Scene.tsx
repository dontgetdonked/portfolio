import type { SceneVariant } from '@/data/site'

/* Drawn scenes stand in for site photography. Each room exists in two states:
   the site as found (cement and grey) and the same room handed over (plaster,
   oak, chalk blue). The pair is what the before/after slider wipes between. */

type Palette = {
  bg: string
  bg2: string
  floor: string
  ground: string
  solid: string
  solid2: string
  stroke: string
  glass: string
  accent: string
  warm: string
  leaf: string
}

const before: Palette = {
  bg: '#c9c7bf',
  bg2: '#bab8b0',
  floor: '#a29e94',
  ground: '#a8a49a',
  solid: '#a8a49b',
  solid2: '#95928a',
  stroke: '#6f6c65',
  glass: '#aeb7b9',
  accent: '#8b8881',
  warm: '#9a9287',
  leaf: '#8c9a86',
}

const after: Palette = {
  bg: '#f7f6f3',
  bg2: '#e6e5df',
  floor: '#c0904f',
  ground: '#8ea47c',
  solid: '#2b3f4c',
  solid2: '#dcdad3',
  stroke: '#16202a',
  glass: '#cfe0ea',
  accent: '#1d5fd6',
  warm: '#b98a4b',
  leaf: '#3f7a55',
}

type State = 'before' | 'after'

function tiles(
  p: Palette,
  x: number,
  y: number,
  cols: number,
  rows: number,
  w: number,
  h: number,
  gap: number,
  fill: string,
) {
  const out = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * (w + gap)}
          y={y + r * (h + gap)}
          width={w}
          height={h}
          fill={fill}
          stroke={p.stroke}
          strokeOpacity={0.12}
        />,
      )
    }
  }
  return out
}

function Room({ p }: { p: Palette }) {
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      <rect y="350" width="800" height="12" fill={p.bg2} />
      <rect y="362" width="800" height="138" fill={p.floor} />
      <path d="M0 362h800" stroke={p.stroke} strokeOpacity="0.25" strokeWidth="2" />
    </>
  )
}

function Living({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <Room p={p} />
      {/* window */}
      <rect x="64" y="66" width="218" height="216" fill={p.glass} stroke={p.stroke} strokeWidth="3" />
      <path d="M173 66v216M64 174h218" stroke={p.stroke} strokeWidth="3" strokeOpacity={isAfter ? 0.8 : 0.5} />
      {isAfter ? (
        <>
          <rect x="34" y="52" width="26" height="250" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.2" />
          <rect x="286" y="52" width="26" height="250" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.2" />
          {/* sofa, table, rug: the room furnished after hand-over */}
          <path d="M330 404h410l38 58H296z" fill={p.bg2} opacity="0.75" />
          <rect x="358" y="228" width="304" height="80" rx="6" fill={p.solid} />
          <rect x="342" y="288" width="336" height="64" rx="8" fill={p.solid} />
          <rect x="378" y="244" width="124" height="52" rx="4" fill={p.solid2} opacity="0.9" />
          <rect x="518" y="244" width="124" height="52" rx="4" fill={p.solid2} opacity="0.9" />
          <path d="M362 352v16M658 352v16" stroke={p.stroke} strokeWidth="5" />
          <rect x="392" y="386" width="196" height="10" rx="2" fill={p.warm} />
          <path d="M408 396v26M572 396v26" stroke={p.warm} strokeWidth="6" />
          <rect x="438" y="84" width="132" height="98" fill={p.bg2} stroke={p.stroke} strokeWidth="2" />
          <path d="M456 156l30-40 24 30 18-18 24 28z" fill={p.accent} opacity="0.8" />
          <path d="M600 0v112" stroke={p.stroke} strokeWidth="2" />
          <path d="M572 112h56l12 34h-80z" fill={p.accent} />
          <path d="M124 330h52l-8 58h-36z" fill={p.warm} />
          <path
            d="M150 330c0-36-22-52-42-58 4 30 18 48 42 58zM150 330c2-32 20-48 40-52-6 28-18 44-40 52z"
            fill={p.leaf}
          />
        </>
      ) : (
        <>
          {/* the flat as found: old radiator, rolled carpet, bare bulb, damp wall */}
          <rect x="96" y="286" width="154" height="64" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.3" />
          <path
            d="M114 290v56M136 290v56M158 290v56M180 290v56M202 290v56M224 290v56"
            stroke={p.stroke}
            strokeWidth="3"
            opacity="0.45"
          />
          <path d="M508 58l16 62-14 44 18 56" stroke={p.stroke} strokeWidth="2.4" fill="none" opacity="0.7" />
          <ellipse cx="676" cy="122" rx="74" ry="52" fill={p.solid2} opacity="0.65" />
          <ellipse cx="392" cy="196" rx="44" ry="34" fill={p.solid2} opacity="0.5" />
          <path d="M600 0v146" stroke={p.stroke} strokeWidth="2" />
          <circle cx="600" cy="156" r="11" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <rect x="452" y="300" width="286" height="52" rx="26" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.3" />
          <path d="M470 300v52M494 300v52" stroke={p.stroke} strokeWidth="2" opacity="0.4" />
          <rect x="330" y="316" width="86" height="36" fill={p.solid} opacity="0.7" />
          <path d="M96 392h250" stroke={p.solid2} strokeWidth="10" opacity="0.7" />
          <path d="M700 268v82" stroke={p.stroke} strokeWidth="3" opacity="0.5" />
          <rect x="688" y="252" width="26" height="18" fill={p.solid} opacity="0.7" />
        </>
      )}
    </>
  )
}

function Bath({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <Room p={p} />
      {isAfter
        ? tiles(p, 40, 40, 4, 2, 172, 150, 4, p.bg2)
        : tiles(p, 40, 40, 11, 6, 60, 46, 4, p.bg2)}
      {/* vanity */}
      <rect x="72" y="256" width="232" height="94" fill={p.solid} />
      <rect x="60" y="242" width="256" height="16" rx="2" fill={isAfter ? p.solid2 : p.floor} />
      <ellipse cx="188" cy="244" rx="58" ry="13" fill={p.glass} stroke={p.stroke} strokeWidth="2" />
      <path d="M188 214v26" stroke={p.stroke} strokeWidth="5" strokeLinecap="round" />
      {isAfter ? (
        <circle cx="188" cy="138" r="62" fill={p.glass} stroke={p.stroke} strokeWidth="3" />
      ) : (
        <>
          <rect x="126" y="76" width="124" height="112" fill={p.glass} stroke={p.stroke} strokeWidth="2" />
          <path d="M126 140l40-30 34 46" stroke={p.stroke} strokeWidth="2" fill="none" opacity="0.6" />
        </>
      )}
      {/* toilet */}
      <rect x="366" y="292" width="76" height="58" rx="6" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.25" />
      <rect x="372" y="232" width="64" height="62" rx="4" fill={p.solid2} stroke={p.stroke} strokeOpacity="0.25" />
      {isAfter ? (
        <>
          <rect x="520" y="86" width="232" height="264" fill={p.glass} opacity="0.5" />
          <rect x="520" y="86" width="232" height="264" fill="none" stroke={p.stroke} strokeWidth="3" />
          <path d="M636 96v22" stroke={p.stroke} strokeWidth="4" />
          <rect x="606" y="118" width="60" height="10" rx="3" fill={p.stroke} />
          <rect x="536" y="332" width="200" height="18" fill={p.solid2} />
          <rect x="556" y="150" width="120" height="70" fill={p.bg} stroke={p.stroke} strokeWidth="2" />
          <rect x="556" y="150" width="120" height="6" fill={p.accent} />
        </>
      ) : (
        <>
          <rect x="512" y="264" width="248" height="86" rx="12" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <path d="M556 282l24 34-14 22" stroke={p.stroke} strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M752 40v226" stroke={p.stroke} strokeWidth="6" opacity="0.6" />
          <path d="M636 40v66" stroke={p.stroke} strokeWidth="4" opacity="0.6" />
          <ellipse cx="700" cy="120" rx="52" ry="40" fill={p.solid} opacity="0.5" />
        </>
      )}
    </>
  )
}

function Kitchen({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <Room p={p} />
      {/* backsplash */}
      {tiles(p, 58, 196, 9, 1, 44, 62, 3, p.bg2)}
      {/* lower run */}
      <rect x="52" y="272" width="436" height="78" fill={p.solid} />
      <rect x="44" y="258" width="452" height="16" rx="2" fill={isAfter ? p.solid2 : p.floor} />
      <path
        d="M112 300h44M226 300h44M340 300h44"
        stroke={isAfter ? p.solid2 : p.stroke}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* upper run */}
      {isAfter ? (
        <rect x="52" y="76" width="288" height="112" fill={p.bg2} stroke={p.stroke} strokeWidth="2" />
      ) : (
        <>
          <rect x="52" y="76" width="288" height="112" fill={p.bg2} stroke={p.stroke} strokeWidth="2" />
          <rect x="196" y="78" width="142" height="108" fill={p.stroke} opacity="0.35" />
        </>
      )}
      <path d="M196 76v112" stroke={p.stroke} strokeWidth="2" opacity="0.4" />
      {/* hood + hob */}
      <path d="M376 58h116l-22 86h-72z" fill={isAfter ? p.solid2 : p.solid} stroke={p.stroke} strokeWidth="2" />
      <rect x="386" y="250" width="96" height="14" rx="2" fill={p.stroke} opacity="0.75" />
      {isAfter ? (
        <>
          <rect x="530" y="286" width="232" height="72" fill={p.solid} />
          <rect x="518" y="272" width="256" height="16" rx="2" fill={p.warm} />
          <circle cx="576" cy="386" r="24" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <circle cx="664" cy="386" r="24" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <path d="M576 402v34M664 402v34" stroke={p.stroke} strokeWidth="4" />
          <path d="M600 0v96" stroke={p.stroke} strokeWidth="2" />
          <path d="M584 96h32l8 30h-48z" fill={p.accent} />
          <path d="M700 64h40v56h-40z" fill={p.leaf} opacity="0.85" />
        </>
      ) : (
        <>
          <rect x="560" y="262" width="118" height="88" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <path d="M560 290h118" stroke={p.stroke} strokeWidth="2" opacity="0.6" />
          <ellipse cx="640" cy="150" rx="70" ry="46" fill={p.solid} opacity="0.45" />
          <path d="M724 210v140" stroke={p.stroke} strokeWidth="5" opacity="0.5" />
        </>
      )}
    </>
  )
}

function Villa({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      <rect y="382" width="800" height="118" fill={p.ground} />
      <path d="M0 382h800" stroke={p.stroke} strokeOpacity="0.25" strokeWidth="2" />
      {isAfter ? (
        <>
          <path d="M156 196L400 78l244 118z" fill={p.solid} />
          <rect x="196" y="196" width="408" height="186" fill={p.bg2} stroke={p.stroke} strokeWidth="2" />
          <rect x="492" y="96" width="34" height="58" fill={p.solid} />
          {tiles(p, 226, 226, 3, 1, 78, 72, 40, p.glass)}
          <rect x="226" y="296" width="196" height="86" fill={p.glass} stroke={p.stroke} strokeWidth="2" />
          <rect x="470" y="288" width="64" height="94" fill={p.warm} stroke={p.stroke} strokeWidth="2" />
          <path d="M452 382h100l24 40H428z" fill={p.bg2} />
          <path d="M560 382c46 0 86 14 118 40H560z" fill={p.solid2} opacity="0.5" />
          <path d="M96 382v-52" stroke={p.warm} strokeWidth="9" />
          <circle cx="96" cy="300" r="44" fill={p.leaf} />
          <path d="M700 382v-38" stroke={p.warm} strokeWidth="7" />
          <circle cx="700" cy="322" r="32" fill={p.leaf} />
        </>
      ) : (
        <>
          <rect x="186" y="336" width="428" height="46" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={216 + i * 126} y="176" width="38" height="160" fill={p.solid} />
              <path
                d={`M${222 + i * 126} 176v-34M${234 + i * 126} 176v-46M${246 + i * 126} 176v-30`}
                stroke={p.stroke}
                strokeWidth="2.5"
              />
            </g>
          ))}
          <rect x="216" y="240" width="386" height="16" fill={p.solid} opacity="0.8" />
          <path d="M120 382c26-36 58-44 88-8z" fill={p.solid2} />
          <path d="M640 382c20-28 44-34 66-6z" fill={p.solid2} />
          <path d="M96 382V150M96 150h68" stroke={p.stroke} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M164 150v34" stroke={p.stroke} strokeWidth="2" opacity="0.6" />
        </>
      )}
    </>
  )
}

function Facade({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <rect width="800" height="500" fill={p.bg} />
      <rect y="420" width="800" height="80" fill={p.ground} />
      <rect x="118" y="64" width="564" height="356" fill={isAfter ? p.bg2 : p.solid2} stroke={p.stroke} strokeWidth="2" />
      <rect x="118" y="368" width="564" height="52" fill={p.solid} opacity={isAfter ? 0.9 : 0.5} />
      {tiles(p, 158, 108, 4, 2, 92, 92, 42, p.glass)}
      <rect x="158" y="302" width="92" height="66" fill={p.glass} stroke={p.stroke} strokeOpacity="0.2" />
      <rect x="292" y="302" width="226" height="66" fill={isAfter ? p.solid2 : p.solid} stroke={p.stroke} strokeWidth="2" />
      <path
        d="M300 302v66M330 302v66M360 302v66M390 302v66M420 302v66M450 302v66M480 302v66M510 302v66"
        stroke={p.stroke}
        strokeWidth="2"
        opacity="0.45"
      />
      {isAfter ? (
        <>
          <path d="M660 64v356" stroke={p.solid2} strokeWidth="9" />
          <path d="M118 372h564" stroke={p.stroke} strokeWidth="2" opacity="0.3" />
          <path d="M118 420h564l18 22H100z" fill={p.solid2} />
          <rect x="158" y="196" width="92" height="8" fill={p.accent} opacity="0.55" />
        </>
      ) : (
        <>
          <path d="M470 64c40 44 26 92-8 132 44 22 62 70 30 118" stroke={p.stroke} strokeWidth="2" fill="none" opacity="0.45" />
          <path d="M196 64l44 66-60 52 52 58" stroke={p.stroke} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M540 118h108v86H540z" fill={p.solid} opacity="0.55" />
          <path d="M252 226h96v74h-96z" fill={p.solid} opacity="0.45" />
          <path d="M132 64v356M292 64v356M452 64v356M612 64v356" stroke={p.stroke} strokeWidth="2.5" opacity="0.5" />
          <path d="M118 158h564M118 258h564M118 358h564" stroke={p.stroke} strokeWidth="2.5" opacity="0.5" />
        </>
      )}
    </>
  )
}

function Office({ p, state }: { p: Palette; state: State }) {
  const isAfter = state === 'after'
  return (
    <>
      <Room p={p} />
      <rect x="72" y="80" width="300" height="180" fill={p.glass} stroke={p.stroke} strokeWidth="3" />
      <path d="M222 80v180" stroke={p.stroke} strokeWidth="3" opacity="0.7" />
      {isAfter ? (
        <>
          <path d="M0 40h800M0 92h800" stroke={p.stroke} strokeWidth="1.5" opacity="0.22" />
          <rect x="250" y="56" width="140" height="10" fill={p.accent} opacity="0.75" />
          <rect x="520" y="56" width="140" height="10" fill={p.accent} opacity="0.75" />
          <rect x="420" y="256" width="320" height="14" rx="2" fill={p.warm} />
          <path d="M448 270v82M712 270v82" stroke={p.solid} strokeWidth="8" />
          <rect x="486" y="180" width="118" height="76" rx="3" fill={p.solid} />
          <rect x="496" y="190" width="98" height="56" fill={p.glass} />
          <path d="M530 256h30v14h-30z" fill={p.solid} />
          <rect x="636" y="206" width="76" height="50" rx="3" fill={p.solid} />
          <path d="M330 404h430l40 58H296z" fill={p.bg2} opacity="0.7" />
          <path d="M128 330h48l-7 56h-34z" fill={p.warm} />
          <path d="M152 330c0-34-20-50-40-56 4 28 17 46 40 56z" fill={p.leaf} />
          <rect x="420" y="292" width="320" height="8" fill={p.solid2} />
        </>
      ) : (
        <>
          <path d="M470 0v120M530 0v92M590 0v138" stroke={p.stroke} strokeWidth="2.5" opacity="0.6" />
          <circle cx="470" cy="128" r="10" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <rect x="560" y="286" width="180" height="64" fill={p.solid2} stroke={p.stroke} strokeWidth="2" />
          <path d="M560 306h180M560 328h180" stroke={p.stroke} strokeWidth="2" opacity="0.5" />
          <rect x="420" y="322" width="110" height="28" fill={p.solid} opacity="0.7" />
          <ellipse cx="640" cy="150" rx="86" ry="52" fill={p.solid} opacity="0.4" />
          <path d="M96 392h260" stroke={p.solid2} strokeWidth="10" opacity="0.6" />
        </>
      )}
    </>
  )
}

const scenes: Record<SceneVariant, (args: { p: Palette; state: State }) => JSX.Element> = {
  living: Living,
  bath: Bath,
  kitchen: Kitchen,
  villa: Villa,
  facade: Facade,
  office: Office,
}

export function Scene({
  variant,
  state = 'after',
  className,
}: {
  variant: SceneVariant
  state?: State
  className?: string
}) {
  const Draw = scenes[variant]
  const p = state === 'after' ? after : before
  return (
    <svg viewBox="0 0 800 500" className={className} role="presentation" preserveAspectRatio="xMidYMid slice">
      <Draw p={p} state={state} />
    </svg>
  )
}

/* A plan-view of the neighbourhood around the office, in the drawing's own
   language: blocks, streets, and a marker where the door is. */
export function MapArt() {
  return (
    <svg viewBox="0 0 800 450" role="img" aria-label="Plan schematic cu zona sediului din strada Bobâlnei, Cluj-Napoca">
      <rect width="800" height="450" fill="#e3e3de" />
      {[80, 180, 280, 380].map((y) => (
        <path key={y} d={`M0 ${y}h800`} stroke="#d4d6d1" strokeWidth="1.5" />
      ))}
      {[120, 260, 400, 540, 680].map((x) => (
        <path key={x} d={`M${x} 0v450`} stroke="#d4d6d1" strokeWidth="1.5" />
      ))}
      <path d="M0 246h800" stroke="#ffffff" strokeWidth="26" />
      <path d="M0 246h800" stroke="#b9bdb7" strokeWidth="1.5" strokeDasharray="14 12" />
      <path d="M452 0v450" stroke="#ffffff" strokeWidth="20" />
      <path d="M452 0v450" stroke="#b9bdb7" strokeWidth="1.5" strokeDasharray="14 12" />
      <rect x="150" y="96" width="120" height="96" fill="#cfcec8" />
      <rect x="300" y="60" width="96" height="132" fill="#cfcec8" />
      <rect x="520" y="86" width="150" height="106" fill="#cfcec8" />
      <rect x="150" y="300" width="180" height="96" fill="#cfcec8" />
      <rect x="560" y="296" width="130" height="110" fill="#cfcec8" />
      <path d="M392 246l-60-54h-60" stroke="#1d5fd6" strokeWidth="3" fill="none" strokeDasharray="8 7" />
      <rect x="330" y="284" width="122" height="82" fill="#16202a" />
      <circle cx="391" cy="325" r="13" fill="#1d5fd6" />
      <circle cx="391" cy="325" r="26" fill="none" stroke="#1d5fd6" strokeWidth="2" opacity="0.55" />
      <text x="330" y="392" fill="#16202a" fontFamily="Archivo, sans-serif" fontSize="17" fontWeight="600">
        Bobâlnei 42
      </text>
      <text x="16" y="238" fill="#7d8d97" fontFamily="Archivo, sans-serif" fontSize="15">
        Str. Bobâlnei
      </text>
      <text x="462" y="30" fill="#7d8d97" fontFamily="Archivo, sans-serif" fontSize="15">
        Calea Baciului
      </text>
    </svg>
  )
}
