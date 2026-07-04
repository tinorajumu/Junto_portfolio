import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../lib/useLocalStorage'
import { dictionary, type DictionaryKey } from './dictionary'

export type Lang = 'ja' | 'en'

interface LanguageState {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: DictionaryKey) => string
}

const LanguageCtx = createContext<LanguageState | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>('portfolio.lang', 'ja')

  const value = useMemo<LanguageState>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === 'ja' ? 'en' : 'ja')),
      t: (key) => dictionary[key][lang],
    }),
    [lang, setLang],
  )

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageCtx)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
