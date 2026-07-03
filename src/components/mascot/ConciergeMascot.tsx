import { useEffect, useRef, useState } from 'react'
import { fallbackResponses, mascotRules } from '../../data/mascotRules'
import type { Expression } from '../../lib/types'

const EXPRESSION_FACE: Record<Expression, string> = {
  happy: '(＾▽＾)',
  angry: '(￣^￣)',
  sad: '(；ω；)',
  relaxed: '(・ω・)',
  surprised: '(⊙_⊙)',
  neutral: '(・_・)',
}

function matchRule(input: string) {
  const normalized = input.toLowerCase()
  for (const rule of mascotRules) {
    if (rule.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) return rule
  }
  return null
}

// ブラウザ標準 Web Speech API。未対応ブラウザでは音声機能を静かに無効化する。
type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((e: any) => void) | null
  onerror: ((e: any) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

export default function ConciergeMascot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('こんにちは！このサイトの案内人です。何か話しかけてみてください。')
  const [expression, setExpression] = useState<Expression>('happy')
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const respond = (userText: string) => {
    const rule = matchRule(userText)
    const response = rule?.response ?? fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    setExpression(rule?.expression ?? 'neutral')
    setMessage(response)
    if (speechSupported) {
      const utter = new SpeechSynthesisUtterance(response)
      utter.lang = 'ja-JP'
      utter.rate = 1.05
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    respond(input.trim())
    setInput('')
  }

  const toggleListening = () => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionCtor) {
      setMessage('このブラウザは音声認識に対応していないみたいです。テキストで話しかけてください。')
      return
    }
    if (listening) {
      recognitionRef.current?.stop()
      return
    }
    const recognition: SpeechRecognitionLike = new SpeechRecognitionCtor()
    recognition.lang = 'ja-JP'
    recognition.interimResults = false
    recognition.continuous = false
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript
      if (transcript) respond(transcript)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
      if (speechSupported) window.speechSynthesis.cancel()
    }
  }, [speechSupported])

  return (
    <div className="fixed bottom-3 right-3 z-40 flex flex-col items-end gap-2 sm:bottom-4 sm:right-4">
      {open && (
        <div className="rig-panel w-64 rounded-md border p-3 shadow-[0_0_20px_rgba(0,0,0,0.6)] sm:w-72">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-[10px] tracking-widest text-gold">CONCIERGE</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">
              ×
            </button>
          </div>
          <div className="mb-2 flex items-start gap-2">
            <span className="text-2xl leading-none">{EXPRESSION_FACE[expression]}</span>
            <p className="rounded-md bg-rig-panelSoft px-2 py-1.5 text-xs text-gray-200">{message}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="話しかけてみる..."
              className="min-w-0 flex-1 rounded-sm border border-rig-border bg-rig-panelStrong px-2 py-1 text-xs text-white placeholder:text-gray-600 focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`shrink-0 rounded-sm border px-2 text-xs ${
                listening ? 'border-live bg-live/20 text-live animate-blink' : 'border-rig-border text-gray-400 hover:border-gold'
              }`}
              title="音声で話しかける"
            >
              🎤
            </button>
            <button
              type="submit"
              className="shrink-0 rounded-sm bg-gold px-2 text-xs font-semibold text-black hover:bg-gold/80"
            >
              送信
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rig-panel flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-2xl shadow-[0_0_18px_rgba(203,161,53,0.4)]"
        aria-label="AIマスコットを開く"
      >
        {EXPRESSION_FACE[expression]}
      </button>
    </div>
  )
}
