import { useEffect, useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useTheme } from '../../lib/ThemeContext'
import { useLanguage } from '../../i18n/LanguageContext'
import type { DictionaryKey } from '../../i18n/dictionary'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

const TIME_MESSAGE_KEYS: { after: number; before: number; key: DictionaryKey }[] = [
  { after: 0, before: 5, key: 'timeMsgNight' },
  { after: 5, before: 9, key: 'timeMsgMorning' },
  { after: 9, before: 17, key: 'timeMsgDay' },
  { after: 17, before: 22, key: 'timeMsgEvening' },
  { after: 22, before: 24, key: 'timeMsgLate' },
]

export default function StatusBar() {
  const { feedCount, depth } = usePortfolio()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hour = now.getHours()
  const messageKey = TIME_MESSAGE_KEYS.find((m) => hour >= m.after && hour < m.before)?.key ?? 'timeMsgDay'

  return (
    <div className="rig-panel rig-scanline flex h-11 w-full items-center gap-6 border-b px-4 text-xs font-display tracking-wide text-gray-300 overflow-hidden">
      <span className="flex items-center gap-2 font-semibold text-live text-glow-live">
        <span className="h-2 w-2 rounded-full bg-live animate-blink" />
        {t('live')}
      </span>
      <span>
        {t('time')}:{' '}
        <span className="text-white">
          {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
        </span>
      </span>
      <span>
        {t('fishCount')}: <span className="text-gold">{feedCount}</span> {t('fishUnit')}
      </span>
      <span>
        {t('depth')}: <span className="text-bioluminescent">{depth}</span> m
      </span>
      <span className="ml-auto hidden truncate text-gray-500 sm:block">{t(messageKey)}</span>
      <button
        onClick={toggleLang}
        className="shrink-0 rounded-sm border border-rig-border px-2 py-1 text-[10px] font-semibold text-gray-300 hover:border-gold/60"
        title="JP / EN"
      >
        {lang === 'ja' ? 'EN' : 'JP'}
      </button>
      <button
        onClick={toggleTheme}
        className="shrink-0 rounded-sm border border-rig-border px-2 py-1 text-[10px] font-semibold text-gray-300 hover:border-gold/60"
        title={theme === 'dark' ? t('themeToggleToLight') : t('themeToggleToDark')}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </div>
  )
}
