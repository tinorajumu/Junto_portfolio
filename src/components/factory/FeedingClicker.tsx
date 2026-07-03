import { usePortfolio } from '../../lib/PortfolioContext'

export default function FeedingClicker() {
  const { feedCount, feed } = usePortfolio()

  const milestone = feedCount >= 50 ? '謎の生命体が混泳中' : feedCount >= 30 ? '水草がライトアップ！' : '静かな池'

  return (
    <div className="rig-panel absolute left-3 top-3 z-10 rounded-sm border p-3 text-xs">
      <p className="font-display tracking-widest text-gold">マイ水族館</p>
      <p className="mt-1 text-2xl font-bold text-white">{feedCount}<span className="ml-1 text-xs text-gray-400">匹</span></p>
      <p className="mt-1 text-[11px] text-bioluminescent">{milestone}</p>
      <button
        onClick={feed}
        className="mt-2 w-full rounded-sm bg-gold px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-gold/80"
      >
        エサをあげる 🍚
      </button>
    </div>
  )
}
