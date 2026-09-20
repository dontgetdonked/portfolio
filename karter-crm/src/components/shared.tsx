import { Badge } from '@/components/ui'
import {
  IconHardHat,
  IconMail,
  IconMeeting,
  IconPhone,
  IconRuler,
  IconTruck,
  IconClock,
  IconWhatsapp,
  type IconProps,
} from '@/components/icons'
import {
  CHANNEL_LABEL,
  DOC_STATUS_LABEL,
  PRIORITY_LABEL,
  STAGE_LABEL,
  type Channel,
  type DocStatus,
  type EventKind,
  type LeadStatus,
  type TaskPriority,
} from '@/types'

export const STAGE_COLOR: Record<LeadStatus, string> = {
  nou: 'var(--stage-nou)',
  contactat: 'var(--stage-contactat)',
  oferta: 'var(--stage-oferta)',
  castigat: 'var(--stage-castigat)',
  pierdut: 'var(--stage-pierdut)',
}

export const STATUS_LABEL_FULL: Record<LeadStatus, string> = {
  ...STAGE_LABEL,
  pierdut: 'Pierdut',
}

export function StageBadge({ status }: { status: LeadStatus }) {
  const tone =
    status === 'castigat' ? 'success' : status === 'pierdut' ? 'danger' : status === 'oferta' ? 'warn' : 'neutral'
  return (
    <Badge tone={tone} dot dotColor={STAGE_COLOR[status]}>
      {STATUS_LABEL_FULL[status]}
    </Badge>
  )
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const tone = priority === 'ridicata' ? 'danger' : priority === 'medie' ? 'warn' : 'neutral'
  return <Badge tone={tone}>{PRIORITY_LABEL[priority]}</Badge>
}

export function DocStatusBadge({ status }: { status: DocStatus }) {
  const tone =
    status === 'platit' || status === 'acceptat'
      ? 'success'
      : status === 'restant' || status === 'respins'
        ? 'danger'
        : status === 'trimis'
          ? 'info'
          : 'neutral'
  return <Badge tone={tone}>{DOC_STATUS_LABEL[status]}</Badge>
}

export const CHANNEL_ICON: Record<Channel, (props: IconProps) => JSX.Element> = {
  telefon: IconPhone,
  email: IconMail,
  whatsapp: IconWhatsapp,
  intalnire: IconMeeting,
}

export function ChannelBadge({ channel }: { channel: Channel }) {
  const Icon = CHANNEL_ICON[channel]
  return (
    <Badge>
      <Icon size={12} />
      {CHANNEL_LABEL[channel]}
    </Badge>
  )
}

export const EVENT_ICON: Record<EventKind, (props: IconProps) => JSX.Element> = {
  vizita: IconHardHat,
  sedinta: IconMeeting,
  masuratori: IconRuler,
  livrare: IconTruck,
  apel: IconPhone,
}

export const EVENT_COLOR: Record<EventKind, string> = {
  vizita: 'var(--chart-3)',
  sedinta: 'var(--chart-1)',
  masuratori: 'var(--chart-2)',
  livrare: 'var(--chart-4)',
  apel: 'var(--chart-5)',
}

export function DueDate({ iso, done }: { iso: string; done?: boolean }) {
  const overdue = !done && new Date(iso).getTime() < Date.now()
  return (
    <span className={overdue ? 'meta-chip overdue' : 'meta-chip'}>
      <IconClock size={13} />
      {new Date(iso).toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  )
}
