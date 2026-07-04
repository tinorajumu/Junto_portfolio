import AquariumFactory from '../factory/AquariumFactory'
import FeedingClicker from '../factory/FeedingClicker'
import GlowFish from '../shared/GlowFish'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function FactoryScene() {
  const { feedbackLog } = usePortfolio()
  const { t } = useLanguage()

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 text-center">
        <p className="font-display text-xs tracking-[0.3em] text-gold">{t('factorySceneLabel')}</p>
        <h2 className="font-display text-lg font-bold text-white">{t('factoryTitle')}</h2>
      </div>

      <FeedingClicker />
      <AquariumFactory />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {feedbackLog.slice(0, 6).map((fish, i) => (
          <GlowFish key={fish.id} fish={fish} seed={i + 1} />
        ))}
      </div>
    </div>
  )
}
