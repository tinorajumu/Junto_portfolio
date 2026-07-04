import { events } from '../../data/events'

export default function EventsSection() {
  return (
    <div className="mt-10">
      <h2 className="font-display text-sm tracking-widest text-gray-500">EVENTS / イベント出演情報</h2>

      {events.length === 0 ? (
        <div className="mt-3 rig-panel rounded-sm border p-4 text-sm text-gray-500">
          現在予定されているイベントはありません。決まり次第ここに追加されます。
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          {events.map((event) => (
            <div key={event.id} className="rig-panel rounded-sm border p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-sm px-2 py-0.5 font-semibold ${
                    event.kind === 'オフライン' ? 'bg-live/20 text-live' : 'bg-bioluminescent/20 text-bioluminescent'
                  }`}
                >
                  {event.kind}
                </span>
                <span className="text-gray-500">{event.date}</span>
                {event.location && <span className="text-gray-500">@ {event.location}</span>}
              </div>
              <p className="mt-2 font-display text-base font-semibold text-white">{event.title}</p>
              {event.description && <p className="mt-1 text-xs text-gray-400">{event.description}</p>}
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-gold hover:underline"
                >
                  詳細を見る ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
