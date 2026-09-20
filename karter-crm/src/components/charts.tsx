/**
 * Small hand-built SVG chart set. No charting library: every mark below is a
 * path this app draws itself, which keeps the visual language identical to the
 * icon set and the bundle tiny.
 */
import { useId, useState } from 'react'
import { compactMoney } from '@/lib/format'

/* ----------------------------- area / line -------------------------------- */

export interface SeriesPoint {
  label: string
  value: number
}

export function AreaChart({
  data,
  height = 210,
  color = 'var(--chart-1)',
  formatValue = compactMoney,
}: {
  data: SeriesPoint[]
  height?: number
  color?: string
  formatValue?: (value: number) => string
}) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)

  const width = 640
  const padding = { top: 14, right: 12, bottom: 26, left: 44 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom

  if (data.length === 0) return null

  const max = Math.max(...data.map((d) => d.value), 1)
  const niceMax = Math.ceil(max / 50_000) * 50_000 || max
  const x = (i: number) => padding.left + (plotW * i) / Math.max(data.length - 1, 1)
  const y = (v: number) => padding.top + plotH - (plotH * v) / niceMax

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1).toFixed(1)},${padding.top + plotH} L${x(0).toFixed(1)},${padding.top + plotH} Z`
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => niceMax * t)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      role="img"
      onMouseLeave={() => setHover(null)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={y(t)}
            y2={y(t)}
            stroke="var(--grid)"
            strokeWidth="1"
          />
          <text
            x={padding.left - 9}
            y={y(t) + 3.5}
            textAnchor="end"
            fontSize="10.5"
            fill="var(--text-3)"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatValue(t)}
          </text>
        </g>
      ))}

      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

      {data.map((d, i) => (
        <g key={d.label}>
          <text x={x(i)} y={height - 7} textAnchor="middle" fontSize="10.5" fill="var(--text-3)">
            {d.label}
          </text>
          <rect
            x={x(i) - plotW / (data.length * 2)}
            y={padding.top}
            width={plotW / data.length}
            height={plotH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
          {hover === i && (
            <>
              <line
                x1={x(i)}
                x2={x(i)}
                y1={padding.top}
                y2={padding.top + plotH}
                stroke="var(--border-strong)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle cx={x(i)} cy={y(d.value)} r="4.5" fill="var(--surface)" stroke={color} strokeWidth="2.4" />
              <g transform={`translate(${Math.min(Math.max(x(i), padding.left + 46), width - padding.right - 46)},${Math.max(y(d.value) - 34, 4)})`}>
                <rect x="-46" y="0" width="92" height="26" rx="7" fill="var(--text)" opacity="0.92" />
                <text
                  x="0"
                  y="17"
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="600"
                  fill="var(--surface)"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatValue(d.value)}
                </text>
              </g>
            </>
          )}
          <circle cx={x(i)} cy={y(d.value)} r="2.8" fill={color} />
        </g>
      ))}
    </svg>
  )
}

/* --------------------------------- donut ---------------------------------- */

export interface Slice {
  label: string
  value: number
  color: string
}

export function DonutChart({
  data,
  size = 176,
  thickness = 22,
  centerLabel,
  centerValue,
}: {
  data: Slice[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerValue?: string
}) {
  const total = data.reduce((sum, s) => sum + s.value, 0)
  const radius = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  if (total === 0) {
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--grid)" strokeWidth={thickness} />
      </svg>
    )
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img">
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        {data.map((slice) => {
          const fraction = slice.value / total
          const dash = fraction * circumference
          const el = (
            <circle
              key={slice.label}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(dash - 2, 0)} ${circumference - Math.max(dash - 2, 0)}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            >
              <title>{`${slice.label}: ${slice.value}`}</title>
            </circle>
          )
          offset += dash
          return el
        })}
      </g>
      {centerValue && (
        <text
          x={cx}
          y={cy + (centerLabel ? 0 : 5)}
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill="var(--text)"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {centerValue}
        </text>
      )}
      {centerLabel && (
        <text x={cx} y={cy + 17} textAnchor="middle" fontSize="11" fill="var(--text-3)">
          {centerLabel}
        </text>
      )}
    </svg>
  )
}

/* ------------------------------- bar chart -------------------------------- */

export function BarChart({
  data,
  height = 200,
  formatValue = compactMoney,
}: {
  data: (SeriesPoint & { color?: string })[]
  height?: number
  formatValue?: (value: number) => string
}) {
  const width = 560
  const padding = { top: 16, right: 10, bottom: 30, left: 46 }
  const plotW = width - padding.left - padding.right
  const plotH = height - padding.top - padding.bottom
  const max = Math.max(...data.map((d) => d.value), 1)
  const slot = plotW / Math.max(data.length, 1)
  const barW = Math.min(slot * 0.56, 44)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }} role="img">
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={padding.top + plotH - plotH * t}
            y2={padding.top + plotH - plotH * t}
            stroke="var(--grid)"
          />
          <text
            x={padding.left - 8}
            y={padding.top + plotH - plotH * t + 3.5}
            textAnchor="end"
            fontSize="10.5"
            fill="var(--text-3)"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatValue(max * t)}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const h = (plotH * d.value) / max
        const x = padding.left + slot * i + (slot - barW) / 2
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={padding.top + plotH - h}
              width={barW}
              height={Math.max(h, 2)}
              rx="5"
              fill={d.color ?? 'var(--chart-1)'}
            >
              <title>{`${d.label}: ${formatValue(d.value)}`}</title>
            </rect>
            <text
              x={x + barW / 2}
              y={height - 10}
              textAnchor="middle"
              fontSize="10.5"
              fill="var(--text-3)"
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* --------------------------------- funnel --------------------------------- */

export function FunnelChart({
  stages,
}: {
  stages: { label: string; count: number; value: number; color: string }[]
}) {
  const max = Math.max(...stages.map((s) => s.count), 1)
  return (
    <div className="stack" style={{ gap: 12 }}>
      {stages.map((stage) => (
        <div key={stage.label} className="stack" style={{ gap: 5 }}>
          <div className="row-between small">
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{stage.label}</span>
            <span className="muted num">
              {stage.count} · {compactMoney(stage.value)} lei
            </span>
          </div>
          <div className="progress" style={{ height: 9 }}>
            <div
              className="progress-fill"
              style={{ width: `${(stage.count / max) * 100}%`, background: stage.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------- sparkline -------------------------------- */

export function Sparkline({
  values,
  color = 'var(--chart-1)',
  width = 92,
  height = 28,
}: {
  values: number[]
  color?: string
  width?: number
  height?: number
}) {
  if (values.length < 2) return null
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values
    .map((v, i) => {
      const x = (width * i) / (values.length - 1)
      const y = height - 2 - ((height - 4) * (v - min)) / span
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
