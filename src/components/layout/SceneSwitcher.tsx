import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'
import type { SceneId } from '../../lib/types'

const scenes: { id: SceneId; label: string; sub: string }[] = [
  { id: 'profile', label: 'Scene 1', sub: 'Profile' },
  { id: 'timeline', label: 'Scene 2', sub: 'Timeline' },
  { id: 'factory', label: 'Scene 3', sub: 'Factory' },
]

export default function SceneSwitcher() {
  const { activeScene, setActiveScene } = usePortfolio()
  const { t } = useLanguage()

  return (
    <nav className="rig-panel flex h-full w-20 flex-col items-center gap-3 border-r py-4 sm:w-40">
      <div className="mb-2 hidden text-[10px] font-display tracking-widest text-gray-500 sm:block">
        {t('switcher')}
      </div>
      {scenes.map((scene) => {
        const isActive = activeScene === scene.id
        return (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene.id)}
            className={`group relative flex w-16 flex-col items-center rounded-sm border px-2 py-3 transition-all duration-200 sm:w-32 ${
              isActive
                ? 'border-gold bg-gold/10 shadow-[0_0_14px_rgba(203,161,53,0.35)]'
                : 'border-rig-border bg-rig-panelSoft hover:border-gold/50'
            }`}
          >
            {isActive && <span className="absolute -left-[1px] top-0 h-full w-1 bg-gold" />}
            <span
              className={`font-display text-[10px] tracking-widest ${
                isActive ? 'text-gold' : 'text-gray-500'
              }`}
            >
              {scene.label}
            </span>
            <span
              className={`mt-1 font-display text-xs font-semibold sm:text-sm ${
                isActive ? 'text-white text-glow-gold' : 'text-gray-400'
              }`}
            >
              {scene.sub}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
