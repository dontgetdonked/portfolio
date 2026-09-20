import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type {
  CalendarEvent,
  Client,
  Conversation,
  CrmState,
  Document,
  Lead,
  LeadStatus,
  Note,
  Permission,
  Task,
  User,
} from '@/types'
import { ROLE_PERMISSIONS } from '@/types'
import { buildSeed } from '@/data/seed'
import { uid } from '@/lib/id'

const STORAGE_KEY = 'karter-crm:state:v1'
const ACTIVITY_LIMIT = 40

type Action =
  | { type: 'reset' }
  | { type: 'switchUser'; userId: string }
  | { type: 'client.add'; client: Client }
  | { type: 'client.update'; id: string; patch: Partial<Client> }
  | { type: 'client.remove'; id: string }
  | { type: 'lead.add'; lead: Lead }
  | { type: 'lead.update'; id: string; patch: Partial<Lead> }
  | { type: 'lead.move'; id: string; status: LeadStatus }
  | { type: 'lead.remove'; id: string }
  | { type: 'task.add'; task: Task }
  | { type: 'task.update'; id: string; patch: Partial<Task> }
  | { type: 'task.toggle'; id: string }
  | { type: 'task.remove'; id: string }
  | { type: 'event.add'; event: CalendarEvent }
  | { type: 'event.remove'; id: string }
  | { type: 'note.add'; note: Note }
  | { type: 'note.update'; id: string; patch: Partial<Note> }
  | { type: 'note.remove'; id: string }
  | { type: 'conversation.add'; conversation: Conversation }
  | { type: 'document.add'; document: Document }
  | { type: 'document.update'; id: string; patch: Partial<Document> }
  | { type: 'document.remove'; id: string }
  | { type: 'user.add'; user: User }
  | { type: 'user.update'; id: string; patch: Partial<User> }
  | { type: 'user.remove'; id: string }
  | { type: 'activity.log'; text: string }

const patchById = <T extends { id: string }>(items: T[], id: string, patch: Partial<T>): T[] =>
  items.map((item) => (item.id === id ? { ...item, ...patch } : item))

function logActivity(state: CrmState, text: string): CrmState {
  const entry = {
    id: uid('a'),
    at: new Date().toISOString(),
    userId: state.currentUserId,
    text,
  }
  return { ...state, activity: [entry, ...state.activity].slice(0, ACTIVITY_LIMIT) }
}

function reducer(state: CrmState, action: Action): CrmState {
  switch (action.type) {
    case 'reset':
      return buildSeed()

    case 'switchUser':
      return { ...state, currentUserId: action.userId }

    case 'client.add':
      return logActivity(
        { ...state, clients: [action.client, ...state.clients] },
        `a adăugat clientul ${action.client.name}`,
      )
    case 'client.update':
      return { ...state, clients: patchById(state.clients, action.id, action.patch) }
    case 'client.remove': {
      const name = state.clients.find((c) => c.id === action.id)?.name ?? 'client'
      return logActivity(
        {
          ...state,
          clients: state.clients.filter((c) => c.id !== action.id),
          leads: state.leads.filter((l) => l.clientId !== action.id),
        },
        `a șters clientul ${name}`,
      )
    }

    case 'lead.add':
      return logActivity(
        { ...state, leads: [action.lead, ...state.leads] },
        `a creat lead-ul „${action.lead.title}”`,
      )
    case 'lead.update':
      return {
        ...state,
        leads: patchById(state.leads, action.id, {
          ...action.patch,
          updatedAt: new Date().toISOString(),
        }),
      }
    case 'lead.move': {
      const lead = state.leads.find((l) => l.id === action.id)
      if (!lead || lead.status === action.status) return state
      const probability =
        action.status === 'castigat' ? 100 : action.status === 'pierdut' ? 0 : lead.probability
      return logActivity(
        {
          ...state,
          leads: patchById(state.leads, action.id, {
            status: action.status,
            probability,
            updatedAt: new Date().toISOString(),
          }),
        },
        `a mutat „${lead.title}” în ${action.status}`,
      )
    }
    case 'lead.remove':
      return { ...state, leads: state.leads.filter((l) => l.id !== action.id) }

    case 'task.add':
      return { ...state, tasks: [action.task, ...state.tasks] }
    case 'task.update':
      return { ...state, tasks: patchById(state.tasks, action.id, action.patch) }
    case 'task.toggle': {
      const task = state.tasks.find((t) => t.id === action.id)
      if (!task) return state
      const next = { ...state, tasks: patchById(state.tasks, action.id, { done: !task.done }) }
      return task.done ? next : logActivity(next, `a finalizat „${task.title}”`)
    }
    case 'task.remove':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) }

    case 'event.add':
      return { ...state, events: [...state.events, action.event] }
    case 'event.remove':
      return { ...state, events: state.events.filter((e) => e.id !== action.id) }

    case 'note.add':
      return { ...state, notes: [action.note, ...state.notes] }
    case 'note.update':
      return { ...state, notes: patchById(state.notes, action.id, action.patch) }
    case 'note.remove':
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id) }

    case 'conversation.add':
      return logActivity(
        { ...state, conversations: [action.conversation, ...state.conversations] },
        `a înregistrat o conversație (${action.conversation.channel})`,
      )

    case 'document.add':
      return logActivity(
        { ...state, documents: [action.document, ...state.documents] },
        `a emis ${action.document.number}`,
      )
    case 'document.update':
      return { ...state, documents: patchById(state.documents, action.id, action.patch) }
    case 'document.remove':
      return { ...state, documents: state.documents.filter((d) => d.id !== action.id) }

    case 'user.add':
      return { ...state, users: [...state.users, action.user] }
    case 'user.update':
      return { ...state, users: patchById(state.users, action.id, action.patch) }
    case 'user.remove':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.id),
        currentUserId:
          state.currentUserId === action.id
            ? (state.users.find((u) => u.id !== action.id)?.id ?? state.currentUserId)
            : state.currentUserId,
      }

    case 'activity.log':
      return logActivity(state, action.text)

    default:
      return state
  }
}

function loadState(): CrmState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildSeed()
    const parsed = JSON.parse(raw) as Partial<CrmState>
    // Guard against a stale or hand-edited payload: fall back to a fresh seed.
    if (!Array.isArray(parsed.leads) || !Array.isArray(parsed.clients)) return buildSeed()
    return { ...buildSeed(), ...parsed } as CrmState
  } catch {
    return buildSeed()
  }
}

interface StoreValue {
  state: CrmState
  dispatch: React.Dispatch<Action>
  currentUser: User
  can: (permission: Permission) => boolean
  userById: (id: string) => User | undefined
  clientById: (id: string | undefined) => Client | undefined
  leadById: (id: string | undefined) => Lead | undefined
  resetDemo: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage can be full or blocked (private mode). The app still works in memory.
    }
  }, [state])

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? state.users[0]!,
    [state.users, state.currentUserId],
  )

  const can = useCallback(
    (permission: Permission) => ROLE_PERMISSIONS[currentUser.role].includes(permission),
    [currentUser.role],
  )

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    dispatch({ type: 'reset' })
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      state,
      dispatch,
      currentUser,
      can,
      userById: (id) => state.users.find((u) => u.id === id),
      clientById: (id) => state.clients.find((c) => c.id === id),
      leadById: (id) => state.leads.find((l) => l.id === id),
      resetDemo,
    }),
    [state, currentUser, can, resetDemo],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore trebuie folosit în interiorul <StoreProvider>')
  return ctx
}
