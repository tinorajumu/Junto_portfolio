import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { FeedbackFish, SceneId } from './types'
import { timeline } from '../data/timeline'

const TOTAL_ENERGY = timeline.reduce((sum, era) => sum + era.energy, 0)

interface PortfolioState {
  activeScene: SceneId
  setActiveScene: (scene: SceneId) => void
  feedCount: number
  feed: () => void
  factoryEnergy: number
  unlockedEras: string[]
  pourEnergy: (eraId: string, amount: number) => void
  totalEnergy: number
  feedbackLog: FeedbackFish[]
  addFeedback: (text: string, author: string) => FeedbackFish
  jumpSignal: number
  triggerJump: () => void
  depth: number
  setDepth: (depth: number) => void
  thanksSignal: number
  triggerThanks: () => void
}

const PortfolioCtx = createContext<PortfolioState | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState<SceneId>('profile')
  const [feedCount, setFeedCount] = useLocalStorage('portfolio.feedCount', 0)
  const [factoryEnergy, setFactoryEnergy] = useLocalStorage('portfolio.factoryEnergy', 0)
  const [unlockedEras, setUnlockedEras] = useLocalStorage<string[]>('portfolio.unlockedEras', [])
  const [feedbackLog, setFeedbackLog] = useLocalStorage<FeedbackFish[]>('portfolio.feedbackLog', [])
  const [jumpSignal, setJumpSignal] = useState(0)
  const [depth, setDepth] = useState(0)
  const [thanksSignal, setThanksSignal] = useState(0)

  const value = useMemo<PortfolioState>(
    () => ({
      activeScene,
      setActiveScene,
      feedCount,
      feed: () => setFeedCount((c) => c + 1),
      factoryEnergy,
      unlockedEras,
      pourEnergy: (eraId, amount) => {
        setUnlockedEras((prev) => (prev.includes(eraId) ? prev : [...prev, eraId]))
        setFactoryEnergy((prev) => Math.min(TOTAL_ENERGY, prev + amount))
      },
      totalEnergy: TOTAL_ENERGY,
      feedbackLog,
      addFeedback: (text, author) => {
        const fish: FeedbackFish = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          text: text.slice(0, 120),
          author: author.trim() || '名もなき訪問者',
          createdAt: Date.now(),
          hue: Math.floor(Math.random() * 360),
        }
        setFeedbackLog((prev) => [fish, ...prev].slice(0, 200))
        return fish
      },
      jumpSignal,
      triggerJump: () => setJumpSignal((s) => s + 1),
      depth,
      setDepth,
      thanksSignal,
      triggerThanks: () => setThanksSignal((s) => s + 1),
    }),
    [
      activeScene,
      feedCount,
      factoryEnergy,
      unlockedEras,
      feedbackLog,
      jumpSignal,
      depth,
      thanksSignal,
      setFeedCount,
      setFactoryEnergy,
      setUnlockedEras,
      setFeedbackLog,
    ],
  )

  return <PortfolioCtx.Provider value={value}>{children}</PortfolioCtx.Provider>
}

export function usePortfolio() {
  const ctx = useContext(PortfolioCtx)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
