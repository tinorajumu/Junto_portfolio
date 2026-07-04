import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function FeedingClicker() {
  const { feedCount, feed } = usePortfolio()
  const { t } = useLanguage()

  const milestoneKey = feedCount >= 50 ? 'milestoneCreatures' : feedCount >= 30 ? 'milestoneLit' : 'milestoneQuiet'

  return (
    <div className="rig-panel absolute left-3 top-3 z-10 rounded-sm border p-3 text-xs">
      <p className="font-display tracking-widest text-gold">{t('myAquarium')}</p>
      <p className="mt-1 text-2xl font-bold text-white">
        {feedCount}
        <span className="ml-1 text-xs text-gray-400">{t('fishUnit')}</span>
      </p>
      <p className="mt-1 text-[11px] text-bioluminescent">{t(milestoneKey)}</p>
      <button
        onClick={feed}
        className="mt-2 w-full rounded-sm bg-gold px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-gold/80"
      >
        {t('feedButton')}
      </button>
    </div>
  )
}
