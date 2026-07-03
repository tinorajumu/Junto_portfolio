import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'

export default function SceneStage({ children }: { children: ReactNode }) {
  const { activeScene } = usePortfolio()
  const [transitioning, setTransitioning] = useState(false)
  const prevScene = useRef(activeScene)

  useEffect(() => {
    if (prevScene.current !== activeScene) {
      prevScene.current = activeScene
      setTransitioning(true)
      const t = setTimeout(() => setTransitioning(false), 420)
      return () => clearTimeout(t)
    }
  }, [activeScene])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div key={activeScene} className={`h-full w-full ${transitioning ? 'animate-scene-in' : ''}`}>
        {children}
      </div>
      {transitioning && <div className="scene-glitch pointer-events-none absolute inset-0 z-40" />}
    </div>
  )
}
