const RO = 'ro-RO'

export const money = (value: number) =>
  new Intl.NumberFormat(RO, {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(value)

export const moneyExact = (value: number) =>
  new Intl.NumberFormat(RO, { style: 'currency', currency: 'RON' }).format(value)

export const compactMoney = (value: number) => {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.', ',')}M`
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1000)}k`
  return String(value)
}

export const number = (value: number) => new Intl.NumberFormat(RO).format(value)

export const percent = (value: number, digits = 0) =>
  `${value.toFixed(digits).replace('.', ',')}%`

export const date = (iso: string) =>
  new Date(iso).toLocaleDateString(RO, { day: '2-digit', month: 'short', year: 'numeric' })

export const dateShort = (iso: string) =>
  new Date(iso).toLocaleDateString(RO, { day: '2-digit', month: 'short' })

export const time = (iso: string) =>
  new Date(iso).toLocaleTimeString(RO, { hour: '2-digit', minute: '2-digit' })

export const dateTime = (iso: string) => `${date(iso)} · ${time(iso)}`

export const MONTHS = [
  'ianuarie',
  'februarie',
  'martie',
  'aprilie',
  'mai',
  'iunie',
  'iulie',
  'august',
  'septembrie',
  'octombrie',
  'noiembrie',
  'decembrie',
]

export const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du']

/** Human relative time, past and future: "acum 3 zile", "în 2 ore". */
export function relative(iso: string, from = new Date()): string {
  const diffMs = new Date(iso).getTime() - from.getTime()
  const past = diffMs < 0
  const abs = Math.abs(diffMs)
  const min = Math.round(abs / 60_000)
  const hours = Math.round(abs / 3_600_000)
  const days = Math.round(abs / 86_400_000)

  let unit: string
  if (min < 1) return 'acum câteva secunde'
  if (min < 60) unit = min === 1 ? 'un minut' : `${min} minute`
  else if (hours < 24) unit = hours === 1 ? 'o oră' : `${hours} ore`
  else if (days < 30) unit = days === 1 ? 'o zi' : `${days} zile`
  else {
    const months = Math.round(days / 30)
    unit = months === 1 ? 'o lună' : `${months} luni`
  }
  return past ? `acum ${unit}` : `în ${unit}`
}

export const initialsOf = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')

/** Start of day, so date comparisons ignore the clock. */
export const startOfDay = (input: Date | string) => {
  const d = new Date(input)
  d.setHours(0, 0, 0, 0)
  return d
}

export const isSameDay = (a: Date | string, b: Date | string) =>
  startOfDay(a).getTime() === startOfDay(b).getTime()

export const addDays = (input: Date | string, days: number) => {
  const d = new Date(input)
  d.setDate(d.getDate() + days)
  return d
}

export const toISODate = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const docTotals = (
  lines: { qty: number; unitPrice: number }[],
  vatRate: number,
) => {
  const net = lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0)
  const vat = net * (vatRate / 100)
  return { net, vat, total: net + vat }
}
