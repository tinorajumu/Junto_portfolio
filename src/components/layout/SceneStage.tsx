import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'
import type { SceneId } from '../../lib/types'

// 訪問済みのシーンだけをマウントしたまま保持し、CSSで表示切替する。
// Factory(3D)を毎回アンマウント/リマウントすると重いFBX/VRMの再読み込みが走ってしまうため。
// ただし全シーンを最初から常時マウントすると、訪れてもいないFactoryの3D読み込みが
// バックグラウンドで走ってしまう（非表示WebGLキャンバスの描画不具合の原因にもなる）ため、
// 実際に一度でも開いたシーンのみ遅延マウントする。
export default function SceneStage({ scenes }: { scenes: Record<SceneId, React.ReactNode> }) {
  const { activeScene } = usePortfolio()
  const [transitioning, setTransitioning] = useState(false)
  const prevScene = useRef(activeScene)
  const [visited, setVisited] = useState<SceneId[]>([activeScene])

  useEffect(() => {
    if (prevScene.current !== activeScene) {
      prevScene.current = activeScene
      setTransitioning(true)
      const t = setTimeout(() => setTransitioning(false), 420)
      setVisited((v) => (v.includes(activeScene) ? v : [...v, activeScene]))
      return () => clearTimeout(t)
    }
  }, [activeScene])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {visited.map((id) => (
        <div
          key={id}
          className={`h-full w-full ${id === activeScene ? (transitioning ? 'animate-scene-in' : '') : 'hidden'}`}
        >
          {scenes[id]}
        </div>
      ))}
      {transitioning && <div className="scene-glitch pointer-events-none absolute inset-0 z-40" />}
    </div>
  )
}
