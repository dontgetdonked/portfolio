/** Domain model for Karter CRM — a services company (construction / repairs / maintenance). */

export type Role = 'admin' | 'manager' | 'agent'

export type Permission =
  | 'clients.write'
  | 'leads.write'
  | 'pipeline.move'
  | 'tasks.write'
  | 'invoices.write'
  | 'invoices.delete'
  | 'users.manage'
  | 'settings.manage'

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'clients.write',
    'leads.write',
    'pipeline.move',
    'tasks.write',
    'invoices.write',
    'invoices.delete',
    'users.manage',
    'settings.manage',
  ],
  manager: ['clients.write', 'leads.write', 'pipeline.move', 'tasks.write', 'invoices.write'],
  agent: ['leads.write', 'pipeline.move', 'tasks.write'],
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  agent: 'Agent vânzări',
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  initials: string
  color: string
  active: boolean
  joinedAt: string
}

export type ClientType = 'persoana_fizica' | 'firma'

export interface Client {
  id: string
  name: string
  type: ClientType
  contactPerson: string
  email: string
  phone: string
  city: string
  address: string
  cui?: string
  ownerId: string
  tags: string[]
  createdAt: string
}

/** Pipeline stages, in order. A lead always sits in exactly one of them. */
export const STAGES = ['nou', 'contactat', 'oferta', 'castigat'] as const
export type Stage = (typeof STAGES)[number]

export const STAGE_LABEL: Record<Stage, string> = {
  nou: 'Nou',
  contactat: 'Contactat',
  oferta: 'Ofertă',
  castigat: 'Câștigat',
}

/** A lead can also be lost, which takes it out of the board without deleting it. */
export type LeadStatus = Stage | 'pierdut'

export type Source = 'website' | 'recomandare' | 'telefon' | 'facebook' | 'google' | 'targ'

export const SOURCE_LABEL: Record<Source, string> = {
  website: 'Website',
  recomandare: 'Recomandare',
  telefon: 'Telefon',
  facebook: 'Facebook',
  google: 'Google Ads',
  targ: 'Târg / expoziție',
}

export type ServiceType =
  | 'constructii'
  | 'renovari'
  | 'instalatii'
  | 'acoperis'
  | 'izolatii'
  | 'amenajari'

export const SERVICE_LABEL: Record<ServiceType, string> = {
  constructii: 'Construcții',
  renovari: 'Renovări',
  instalatii: 'Instalații',
  acoperis: 'Acoperiș',
  izolatii: 'Izolații termice',
  amenajari: 'Amenajări interioare',
}

export interface Lead {
  id: string
  title: string
  clientId: string
  status: LeadStatus
  value: number
  service: ServiceType
  source: Source
  ownerId: string
  probability: number
  createdAt: string
  updatedAt: string
  expectedCloseAt: string
  lostReason?: string
}

export type TaskPriority = 'scazuta' | 'medie' | 'ridicata'

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  scazuta: 'Scăzută',
  medie: 'Medie',
  ridicata: 'Ridicată',
}

export interface Task {
  id: string
  title: string
  description: string
  done: boolean
  dueAt: string
  priority: TaskPriority
  assigneeId: string
  clientId?: string
  leadId?: string
  createdAt: string
}

export type EventKind = 'vizita' | 'sedinta' | 'masuratori' | 'livrare' | 'apel'

export const EVENT_LABEL: Record<EventKind, string> = {
  vizita: 'Vizită pe șantier',
  sedinta: 'Ședință',
  masuratori: 'Măsurători',
  livrare: 'Livrare materiale',
  apel: 'Apel programat',
}

export interface CalendarEvent {
  id: string
  title: string
  kind: EventKind
  startAt: string
  durationMin: number
  clientId?: string
  attendeeIds: string[]
  location: string
}

export interface Note {
  id: string
  title: string
  body: string
  clientId?: string
  leadId?: string
  authorId: string
  pinned: boolean
  createdAt: string
}

export type Channel = 'telefon' | 'email' | 'whatsapp' | 'intalnire'

export const CHANNEL_LABEL: Record<Channel, string> = {
  telefon: 'Telefon',
  email: 'Email',
  whatsapp: 'WhatsApp',
  intalnire: 'Întâlnire',
}

export type Direction = 'in' | 'out'

export interface Conversation {
  id: string
  clientId: string
  leadId?: string
  channel: Channel
  direction: Direction
  subject: string
  body: string
  userId: string
  at: string
}

export type DocKind = 'oferta' | 'factura'
export type DocStatus = 'draft' | 'trimis' | 'acceptat' | 'platit' | 'restant' | 'respins'

export const DOC_STATUS_LABEL: Record<DocStatus, string> = {
  draft: 'Ciornă',
  trimis: 'Trimis',
  acceptat: 'Acceptat',
  platit: 'Plătit',
  restant: 'Restant',
  respins: 'Respins',
}

export interface DocLine {
  id: string
  description: string
  qty: number
  unit: string
  unitPrice: number
}

export interface Document {
  id: string
  number: string
  kind: DocKind
  status: DocStatus
  clientId: string
  leadId?: string
  issuedAt: string
  dueAt: string
  lines: DocLine[]
  vatRate: number
  notes: string
}

export interface ActivityEntry {
  id: string
  at: string
  userId: string
  text: string
}

export interface CrmState {
  users: User[]
  clients: Client[]
  leads: Lead[]
  tasks: Task[]
  events: CalendarEvent[]
  notes: Note[]
  conversations: Conversation[]
  documents: Document[]
  activity: ActivityEntry[]
  currentUserId: string
}
