import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'karter-crm:theme'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme trebuie folosit în interiorul <ThemeProvider>')
  return ctx
}
