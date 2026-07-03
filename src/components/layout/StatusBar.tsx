import { useEffect, useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'
import { timeOfDayMessages } from '../../data/mascotRules'

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function StatusBar() {
  const { feedCount, depth } = usePortfolio()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hour = now.getHours()
  const message =
    timeOfDayMessages.find((m) => hour >= m.after && hour < m.before)?.message ?? '稼働中。'

  return (
    <div className="rig-panel rig-scanline flex h-11 w-full items-center gap-6 border-b px-4 text-xs font-display tracking-wide text-gray-300 overflow-hidden">
      <span className="flex items-center gap-2 font-semibold text-live text-glow-live">
        <span className="h-2 w-2 rounded-full bg-live animate-blink" />
        LIVE
      </span>
      <span>
        TIME:{' '}
        <span className="text-white">
          {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
        </span>
      </span>
      <span>
        FISH COUNT: <span className="text-gold">{feedCount}</span> 匹
      </span>
      <span>
        DEPTH: <span className="text-bioluminescent">{depth}</span> m
      </span>
      <span className="ml-auto hidden truncate text-gray-500 sm:block">{message}</span>
    </div>
  )
}
