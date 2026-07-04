import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

const ThemeCtx = createContext<ThemeState | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('portfolio.theme', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const value = useMemo<ThemeState>(
    () => ({ theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }),
    [theme, setTheme],
  )

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
