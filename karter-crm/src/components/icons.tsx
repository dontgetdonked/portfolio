/**
 * Hand-drawn icon set for Karter CRM.
 *
 * Every icon is a 24x24 stroked path so the whole set shares one optical
 * weight. They inherit `currentColor`, so a parent's text colour drives them.
 * No icon font, no emoji, no third-party sprite.
 */
import type { SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
}

function Svg({ size = 18, strokeWidth = 1.7, children, ...rest }: IconProps & { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* ------------------------------- navigation ------------------------------- */

export const IconDashboard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7.5" height="8.5" rx="2" />
    <rect x="13.5" y="3" width="7.5" height="5.5" rx="2" />
    <rect x="13.5" y="11.5" width="7.5" height="9.5" rx="2" />
    <rect x="3" y="14.5" width="7.5" height="6.5" rx="2" />
  </Svg>
)

export const IconClients = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
    <circle cx="9" cy="7" r="3.4" />
    <path d="M22 20v-1.5a4 4 0 0 0-3-3.87" />
    <path d="M16.5 3.8a4 4 0 0 1 0 7.4" />
  </Svg>
)

export const IconLeads = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 4.5h18l-6.8 8v6.2l-4.4 2.3V12.5z" />
  </Svg>
)

export const IconPipeline = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="5.5" height="16" rx="1.8" />
    <rect x="9.9" y="4" width="5.5" height="11" rx="1.8" />
    <rect x="17.3" y="4" width="4.2" height="7" rx="1.8" />
  </Svg>
)

export const IconTasks = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3.5" width="18" height="17" rx="3" />
    <path d="M8 12.2l2.6 2.6L16 9.4" />
  </Svg>
)

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4.8" width="18" height="16.2" rx="3" />
    <path d="M3 9.6h18" />
    <path d="M8 2.6v4M16 2.6v4" />
    <circle cx="8.4" cy="14" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="17.3" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="8.4" cy="17.3" r="1.05" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconNotes = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 3.5h9.5L20 9v11.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z" />
    <path d="M14 3.6V9h5.4" />
    <path d="M8 13.5h7M8 17h4.5" />
  </Svg>
)

export const IconConversations = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.5 15.5H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v1" />
    <path d="M10 20.5h7.8l3.2 2.2V13a3 3 0 0 0-3-3h-8a3 3 0 0 0-3 3v5.5a2 2 0 0 0 2 2z" />
  </Svg>
)

export const IconInvoices = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 2.8h13a1 1 0 0 1 1 1v17.4l-3-1.8-2.75 1.8L12 19.4l-2.75 1.8-2.75-1.8-2 1.8V3.8a1 1 0 0 1 1-1z" />
    <path d="M9 8h6M9 12h6" />
  </Svg>
)

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.6l7.5 3v5.8c0 4.7-3.1 8.3-7.5 9.9-4.4-1.6-7.5-5.2-7.5-9.9V5.6z" />
    <circle cx="12" cy="10" r="2.4" />
    <path d="M8.2 16.6a4 4 0 0 1 7.6 0" />
  </Svg>
)

export const IconSettings = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M19.6 14.5a1.6 1.6 0 0 0 .32 1.77l.06.06a1.95 1.95 0 1 1-2.76 2.76l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.95 1.95 0 0 1-3.9 0v-.09a1.6 1.6 0 0 0-1.05-1.47 1.6 1.6 0 0 0-1.77.32l-.06.06a1.95 1.95 0 1 1-2.76-2.76l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-.97H3.6a1.95 1.95 0 1 1 0-3.9h.09a1.6 1.6 0 0 0 1.47-1.05 1.6 1.6 0 0 0-.32-1.77l-.06-.06a1.95 1.95 0 1 1 2.76-2.76l.06.06a1.6 1.6 0 0 0 1.77.32h.08a1.6 1.6 0 0 0 .97-1.47V3.6a1.95 1.95 0 1 1 3.9 0v.09a1.6 1.6 0 0 0 .97 1.47 1.6 1.6 0 0 0 1.77-.32l.06-.06a1.95 1.95 0 1 1 2.76 2.76l-.06.06a1.6 1.6 0 0 0-.32 1.77v.08a1.6 1.6 0 0 0 1.47.97h.17a1.95 1.95 0 1 1 0 3.9h-.09a1.6 1.6 0 0 0-1.47.97z" />
  </Svg>
)

/* --------------------------------- actions -------------------------------- */

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="7" />
    <path d="M20.5 20.5l-4.75-4.75" />
  </Svg>
)

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
)

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8" />
  </Svg>
)

export const IconCheck = (p: IconProps) => (
  <Svg strokeWidth={2.4} {...p}>
    <path d="M4.8 12.6l4.9 4.9L19.2 7.8" />
  </Svg>
)

export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.8 6.3h16.4" />
    <path d="M9 6.3V4.6a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 4.6v1.7" />
    <path d="M18.2 6.3l-.8 13.1a1.6 1.6 0 0 1-1.6 1.5H8.2a1.6 1.6 0 0 1-1.6-1.5L5.8 6.3" />
    <path d="M10.3 10.6v6M13.7 10.6v6" />
  </Svg>
)

export const IconEdit = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16.4 3.9a2.4 2.4 0 0 1 3.4 3.4L8.2 18.9l-4.4 1 1-4.4z" />
    <path d="M14.8 5.5l3.4 3.4" />
  </Svg>
)

export const IconFilter = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5.5h16M7 12h10M10 18.5h4" />
  </Svg>
)

export const IconMore = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="5.4" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18.6" r="1.5" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconRefresh = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.2 11.4a8.2 8.2 0 0 0-14.3-4.3L3.4 9.5" />
    <path d="M3.8 12.6a8.2 8.2 0 0 0 14.3 4.3l2.5-2.4" />
    <path d="M3.4 4.9v4.6h4.6M20.6 19.1v-4.6H16" />
  </Svg>
)

export const IconDownload = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.6v11.2" />
    <path d="M7.6 10.6L12 15l4.4-4.4" />
    <path d="M4.2 17.4v1.6a2 2 0 0 0 2 2h11.6a2 2 0 0 0 2-2v-1.6" />
  </Svg>
)

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6.5h16M4 12h16M4 17.5h16" />
  </Svg>
)

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.4 5.6L15.8 12l-6.4 6.4" />
  </Svg>
)

export const IconChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.6 5.6L8.2 12l6.4 6.4" />
  </Svg>
)

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.8 9.2L12 15.4l6.2-6.2" />
  </Svg>
)

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15.2" />
    <path d="M13.6 6.4L19.2 12l-5.6 5.6" />
  </Svg>
)

/* --------------------------------- theme ---------------------------------- */

export const IconSun = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2.4M12 19.2v2.4M4.2 12H1.8M22.2 12h-2.4M6.4 6.4L4.7 4.7M19.3 19.3l-1.7-1.7M17.6 6.4l1.7-1.7M4.7 19.3l1.7-1.7" />
  </Svg>
)

export const IconMoon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.5 14.6A8.8 8.8 0 0 1 9.4 3.5a8.8 8.8 0 1 0 11.1 11.1z" />
  </Svg>
)

/* -------------------------------- contact --------------------------------- */

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.7 17.3 17.3 0 0 1-5.3-5.3A17.6 17.6 0 0 1 3.3 5.3 1.8 1.8 0 0 1 5.1 3.4h2.7a1.8 1.8 0 0 1 1.8 1.55c.11.86.32 1.7.62 2.5a1.8 1.8 0 0 1-.4 1.9l-1.15 1.15a14.2 14.2 0 0 0 5.3 5.3l1.15-1.15a1.8 1.8 0 0 1 1.9-.4c.8.3 1.64.51 2.5.62A1.8 1.8 0 0 1 21 16.6z" />
  </Svg>
)

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.6" />
    <path d="M3.4 7.2l7.5 5.2a2 2 0 0 0 2.2 0l7.5-5.2" />
  </Svg>
)

export const IconWhatsapp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.4 20.6l1.3-4.3a8.3 8.3 0 1 1 3.1 3.1z" />
    <path d="M9 9.2c0 3.1 2.7 5.8 5.8 5.8.5 0 1-.4 1-1v-.9l-1.9-.7-.9 1a6.8 6.8 0 0 1-2.4-2.4l1-.9-.7-1.9H10c-.6 0-1 .5-1 1z" />
  </Svg>
)

export const IconMeeting = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.5 12.4l2.1 2.1a1.6 1.6 0 0 0 2.3 0l4.6-4.6" />
    <path d="M3 7.4l3.4-2.8a2 2 0 0 1 1.3-.5h8.6a2 2 0 0 1 1.3.5L21 7.4" />
    <path d="M3 7.4v9.4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.4" />
  </Svg>
)

export const IconMapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21.4s7-5.6 7-11.1a7 7 0 1 0-14 0c0 5.5 7 11.1 7 11.1z" />
    <circle cx="12" cy="10.1" r="2.6" />
  </Svg>
)

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 6.8V12l3.4 2" />
  </Svg>
)

export const IconBuilding = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.6 20.8h16.8" />
    <path d="M5.6 20.8V5a1.6 1.6 0 0 1 1.6-1.6h6.4A1.6 1.6 0 0 1 15.2 5v15.8" />
    <path d="M15.2 9.6h2.6a1.6 1.6 0 0 1 1.6 1.6v9.6" />
    <path d="M8.6 7.4h3.4M8.6 11h3.4M8.6 14.6h3.4" />
  </Svg>
)

export const IconUser = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="7.6" r="3.9" />
    <path d="M4.4 20.6a7.6 7.6 0 0 1 15.2 0" />
  </Svg>
)

/* --------------------------------- domain --------------------------------- */

export const IconTrendUp = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M3.6 17.4l5.8-6 3.6 3.6 6.6-7.4" />
    <path d="M15 7.6h5.6v5.6" />
  </Svg>
)

export const IconTrendDown = (p: IconProps) => (
  <Svg strokeWidth={2} {...p}>
    <path d="M3.6 7.4l5.8 6 3.6-3.6 6.6 7.4" />
    <path d="M15 17.4h5.6v-5.6" />
  </Svg>
)

export const IconMoney = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="2.6" />
    <circle cx="12" cy="12" r="2.9" />
    <path d="M6.2 9.4v5.2M17.8 9.4v5.2" />
  </Svg>
)

export const IconTarget = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="12" r="4.9" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconRuler = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.6 2.9l6.5 6.5a1.4 1.4 0 0 1 0 2L11 21.1a1.4 1.4 0 0 1-2 0L2.9 14.6a1.4 1.4 0 0 1 0-2L12.6 2.9a1.4 1.4 0 0 1 2 0z" />
    <path d="M8 9.4l1.8 1.8M11 6.4l1.8 1.8M5 12.4l1.8 1.8M14 3.4l1.8 1.8" />
  </Svg>
)

export const IconTruck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.6 6.4h10.6v9.8H2.6z" />
    <path d="M13.2 10h3.9l3.3 3.3v2.9h-7.2z" />
    <circle cx="7" cy="18.2" r="1.9" />
    <circle cx="17" cy="18.2" r="1.9" />
    <path d="M8.9 18.2h6.2" />
  </Svg>
)

export const IconHardHat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.8 17.4h18.4" />
    <path d="M4.4 17.4v-2.2a7.6 7.6 0 0 1 15.2 0v2.2" />
    <path d="M9.4 8.2V5.6a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v2.6" />
  </Svg>
)

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.2 2.6l7.2 7.2-2.1 2.1-2.5-.7-4.3 4.3.6 3.3-2 2-8.2-8.2 2-2 3.3.6 4.3-4.3-.7-2.5z" />
    <path d="M6.3 17.7L2.8 21.2" />
  </Svg>
)

export const IconInbox = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 13.4h4.4l1.4 2.6h6.4l1.4-2.6H21" />
    <path d="M5.5 4.6h13a2 2 0 0 1 1.85 1.24L21 13.4v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4l1.65-7.56A2 2 0 0 1 5.5 4.6z" />
  </Svg>
)

export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.6 3.9L2.5 17.8a1.6 1.6 0 0 0 1.4 2.4h16.2a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0z" />
    <path d="M12 9.4v4.2" />
    <circle cx="12" cy="16.8" r="1.05" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconBolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.4 2.4L4.6 13.4h6.2l-.8 8.2 9-11.2h-6.4z" />
  </Svg>
)

export const IconLogo = (p: IconProps) => (
  <Svg strokeWidth={2.3} {...p}>
    <path d="M7 4v16M7 12l8-8M7 12l9 8" />
  </Svg>
)
