import { useRef, useState } from 'react'
import gsap from 'gsap'
import { timeline } from '../../data/timeline'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TimelineScene() {
  const { pourEnergy, unlockedEras, factoryEnergy, totalEnergy, setActiveScene } = usePortfolio()
  const { lang, t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const trunkRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [selectedEraId, setSelectedEraId] = useState<string | null>(null)
  const selectedEra = timeline.find((e) => e.id === selectedEraId) ?? null

  const handleFlow = (eraId: string, energy: number) => {
    const container = containerRef.current
    const trunk = trunkRef.current
    const card = cardRefs.current[eraId]
    if (!container || !trunk || !card) return

    const containerRect = container.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const trunkRect = trunk.getBoundingClientRect()

    const start = {
      x: cardRect.right - containerRect.left - 6,
      y: cardRect.top + cardRect.height / 2 - containerRect.top,
    }
    const end = {
      x: trunkRect.left + trunkRect.width / 2 - containerRect.left,
      y: trunkRect.top - containerRect.top,
    }
    const mid = {
      x: (start.x + end.x) / 2 + 40,
      y: (start.y + end.y) / 2,
    }

    const beam = document.createElement('div')
    beam.className = 'absolute h-[3px] w-6 rounded-full bg-gradient-to-r from-bioluminescent to-gold shadow-[0_0_10px_2px_rgba(93,242,214,0.7)]'
    beam.style.left = `${start.x}px`
    beam.style.top = `${start.y}px`
    container.appendChild(beam)

    const fish = document.createElement('div')
    fish.textContent = '🐟'
    fish.className = 'absolute text-lg drop-shadow-[0_0_6px_rgba(93,242,214,0.9)]'
    fish.style.left = `${start.x}px`
    fish.style.top = `${start.y}px`
    container.appendChild(fish)

    const tl = gsap.timeline({
      onComplete: () => {
        beam.remove()
        fish.remove()
        pourEnergy(eraId, energy)
      },
    })

    tl.to(beam, { left: mid.x, top: mid.y, duration: 0.45, ease: 'power1.in' }, 0)
      .to(beam, { left: end.x, top: end.y, duration: 0.5, ease: 'power1.out' })
      .to(fish, { left: mid.x, top: mid.y - 12, rotate: 20, duration: 0.45, ease: 'power1.in' }, 0)
      .to(fish, { left: end.x, top: end.y, rotate: -10, duration: 0.5, ease: 'power1.out' })
      .to([beam, fish], { opacity: 0, duration: 0.15 }, '-=0.1')
  }

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto px-6 py-10 sm:px-12">
      <p className="font-display text-xs tracking-[0.3em] text-gold">{t('timelineSceneLabel')}</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-white">{t('timelineTitle')}</h2>
      <p className="mt-2 max-w-xl text-sm text-gray-400">{t('timelineDesc')}</p>

      <div className="relative mt-10 flex max-w-2xl flex-col gap-4">
        {timeline.map((era) => {
          const done = unlockedEras.includes(era.id)
          return (
            <button
              key={era.id}
              ref={(el) => {
                cardRefs.current[era.id] = el
              }}
              onClick={() => {
                setSelectedEraId(era.id)
                if (!done) handleFlow(era.id, era.energy)
              }}
              className={`rig-panel relative w-full rounded-sm border p-4 text-left transition-colors ${
                done ? 'border-bioluminescent/60 bg-depth-mid/40' : 'hover:border-gold/60'
              } ${selectedEraId === era.id ? 'ring-1 ring-gold' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs tracking-widest text-gold">{era.year[lang]}</span>
                {done && <span className="text-xs text-bioluminescent">{t('timelinePoured')}</span>}
              </div>
              <p className="mt-1 font-display text-lg font-semibold text-white">{era.title[lang]}</p>
              <p className="mt-1 text-xs text-gray-400">{era.description[lang]}</p>
            </button>
          )
        })}
      </div>

      <div className="mt-6 max-w-2xl rig-panel rounded-sm border p-4">
        {selectedEra ? (
          <>
            <p className="font-display text-xs tracking-widest text-gold">{t('timelineSelected')}</p>
            <p className="mt-1 font-display text-lg font-semibold text-white">{selectedEra.title[lang]}</p>
            <p className="mt-1 text-xs text-gray-400">{selectedEra.description[lang]}</p>
            {selectedEra.images && (
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {selectedEra.images.map((src, i) => (
                  <img key={i} src={src} className="h-20 w-full rounded-sm object-cover sm:h-24" alt="" />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">{t('timelineSelectHint')}</p>
        )}
      </div>

      <div className="mb-8 mt-6 flex max-w-2xl items-center gap-4">
        <div ref={trunkRef} className="h-3 w-3 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(203,161,53,0.8)]" />
        <div className="flex-1 rig-panel rounded-sm border p-3">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{t('factoryEnergy')}</span>
            <span>
              {factoryEnergy} / {totalEnergy}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-rig-panelStrong">
            <div
              className="h-full rounded-full bg-gradient-to-r from-bioluminescent to-gold transition-all duration-500"
              style={{ width: `${Math.min(100, (factoryEnergy / totalEnergy) * 100)}%` }}
            />
          </div>
          {factoryEnergy >= totalEnergy && (
            <button
              onClick={() => setActiveScene('factory')}
              className="mt-3 rounded-sm bg-gold px-3 py-1.5 text-xs font-semibold text-black hover:bg-gold/80"
            >
              {t('viewFactory')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
