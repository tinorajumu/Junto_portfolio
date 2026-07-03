import { useState } from 'react'
import { usePortfolio } from '../../lib/PortfolioContext'

function timeAgo(ts: number) {
  const diff = Math.max(0, Date.now() - ts)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'たった今'
  if (mins < 60) return `${mins}分前`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}時間前`
  return `${Math.floor(hrs / 24)}日前`
}

export default function LiveChatPanel({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { feedbackLog, addFeedback, triggerThanks } = usePortfolio()
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [popup, setPopup] = useState<{ text: string; author: string; hue: number } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const fish = addFeedback(trimmed, author)
    triggerThanks()
    setPopup({ text: fish.text, author: fish.author, hue: fish.hue })
    setText('')
    setTimeout(() => setPopup(null), 2600)
  }

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="rig-panel fixed right-3 top-16 z-30 rounded-sm border px-2 py-3 font-display text-[10px] tracking-widest text-gold hover:bg-gold/10"
      >
        CHAT
      </button>
    )
  }

  return (
    <aside className="rig-panel relative flex h-full w-64 flex-col border-l sm:w-72">
      <div className="flex items-center justify-between border-b border-rig-border px-3 py-2">
        <span className="font-display text-xs tracking-widest text-gold">感想放流 / LIVE CHAT</span>
        <button onClick={onToggle} className="text-gray-500 hover:text-white" aria-label="close chat">
          ×
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {feedbackLog.length === 0 && (
          <p className="text-xs text-gray-500">
            まだ感想はありません。最初の一匹を放流してみてください。
          </p>
        )}
        {feedbackLog.map((f) => (
          <div
            key={f.id}
            className="rounded-sm border-l-2 bg-rig-panelSoft px-2 py-1.5 text-xs"
            style={{ borderColor: `hsl(${f.hue}, 80%, 55%)` }}
          >
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span style={{ color: `hsl(${f.hue}, 80%, 65%)` }}>{f.author}</span>
              <span>{timeAgo(f.createdAt)}</span>
            </div>
            <p className="mt-0.5 text-gray-200">{f.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-rig-border p-3">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="名前（任意）"
          maxLength={20}
          className="mb-2 w-full rounded-sm border border-rig-border bg-rig-panelStrong px-2 py-1 text-xs text-white placeholder:text-gray-600 focus:border-gold focus:outline-none"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="感想を放流する..."
          maxLength={120}
          rows={2}
          className="w-full resize-none rounded-sm border border-rig-border bg-rig-panelStrong px-2 py-1 text-xs text-white placeholder:text-gray-600 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-sm bg-live py-1.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-live-hover"
        >
          放流する 🐟
        </button>
      </form>

      {popup && (
        <div
          key={popup.text + popup.author}
          className="pointer-events-none absolute inset-x-3 top-14 z-20 animate-scene-in rounded-md border-2 p-3 text-sm shadow-[0_0_24px_rgba(0,0,0,0.6)]"
          style={{
            background: `linear-gradient(135deg, hsl(${popup.hue},70%,20%), hsl(${popup.hue},70%,12%))`,
            borderColor: `hsl(${popup.hue},80%,55%)`,
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: `hsl(${popup.hue},80%,70%)` }}>
            Super Splash!
          </div>
          <div className="mt-1 font-semibold text-white">{popup.author}</div>
          <div className="text-gray-100">{popup.text}</div>
        </div>
      )}
    </aside>
  )
}
