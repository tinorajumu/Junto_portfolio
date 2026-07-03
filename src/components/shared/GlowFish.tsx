import { useMemo } from 'react'
import type { FeedbackFish } from '../../lib/types'

export default function GlowFish({ fish, seed = 0 }: { fish: FeedbackFish; seed?: number }) {
  const style = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 999 + n * 57.13) * 10000
      return x - Math.floor(x)
    }
    return {
      top: `${10 + rand(1) * 75}%`,
      left: `${5 + rand(2) * 80}%`,
      animationDuration: `${5 + rand(3) * 6}s`,
      animationDelay: `-${rand(4) * 6}s`,
      color: `hsl(${fish.hue}, 85%, 65%)`,
    } as React.CSSProperties
  }, [fish, seed])

  return (
    <div
      className="pointer-events-none absolute flex max-w-[9rem] animate-drift items-center gap-1 rounded-full border px-2 py-1 text-[10px] backdrop-blur-sm animate-glow"
      style={{
        ...style,
        borderColor: style.color as string,
        background: 'rgba(4, 13, 26, 0.55)',
      }}
      title={fish.text}
    >
      <span aria-hidden>🐟</span>
      <span className="truncate" style={{ color: style.color as string }}>
        {fish.text}
      </span>
    </div>
  )
}
