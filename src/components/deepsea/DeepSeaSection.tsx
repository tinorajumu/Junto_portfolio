import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'
import GlowFish from '../shared/GlowFish'

const ZONE_HEIGHT = 640

function zoneBackground(zoneIndex: number) {
  const darkness = Math.min(0.9, zoneIndex * 0.12)
  return `linear-gradient(180deg, rgba(1,5,12,${darkness}) 0%, rgba(1,5,12,${Math.min(1, darkness + 0.25)}) 100%)`
}

export default function DeepSeaSection({ onDepthChange }: { onDepthChange: (depth: number) => void }) {
  const { feedbackLog } = usePortfolio()
  const { t } = useLanguage()
  const [zoneCount, setZoneCount] = useState(2)
  const rootRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setZoneCount((z) => Math.min(z + 1, 400))
        }
      },
      { rootMargin: '800px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const handleScroll = () => {
      const rect = root.getBoundingClientRect()
      const scrolledInto = Math.max(0, -rect.top)
      onDepthChange(Math.floor(scrolledInto / 3))
    }
    const scrollParent = root.closest('[data-scroll-root]') ?? window
    scrollParent.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => scrollParent.removeEventListener('scroll', handleScroll)
  }, [onDepthChange])

  const pool = feedbackLog.length > 0 ? feedbackLog : []

  return (
    <div ref={rootRef} className="relative w-full">
      <div className="border-t border-bioluminescent/20 bg-depth-shallow/40 px-6 py-6 text-center">
        <p className="font-display text-xs tracking-[0.3em] text-bioluminescent">{t('deepSeaTitle')}</p>
        <p className="mt-1 text-xs text-gray-400">{t('deepSeaDesc')}</p>
      </div>

      {Array.from({ length: zoneCount }).map((_, zoneIndex) => (
        <div
          key={zoneIndex}
          className="relative w-full overflow-hidden"
          style={{ height: ZONE_HEIGHT, background: zoneBackground(zoneIndex) }}
        >
          <span className="absolute left-3 top-3 font-display text-[10px] tracking-widest text-gray-600">
            ZONE {zoneIndex + 1} · ~{(zoneIndex + 1) * 200}m
          </span>
          {pool.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1.5 w-1.5 animate-drift rounded-full bg-bioluminescent/60 animate-glow"
                  style={{
                    top: `${10 + ((i * 37 + zoneIndex * 13) % 80)}%`,
                    left: `${5 + ((i * 53 + zoneIndex * 29) % 85)}%`,
                    animationDuration: `${4 + (i % 3)}s`,
                  }}
                />
              ))
            : Array.from({ length: Math.min(5, pool.length) }).map((_, i) => {
                const fish = pool[(zoneIndex * 5 + i) % pool.length]
                return <GlowFish key={`${zoneIndex}-${fish.id}`} fish={fish} seed={zoneIndex * 7 + i} />
              })}
        </div>
      ))}

      <div ref={sentinelRef} className="h-1 w-full" />
    </div>
  )
}
