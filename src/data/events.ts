export interface PortfolioEvent {
  id: string
  date: string // 例: "2026-08-10" や "2026年8月上旬" のような表記もOK
  title: string
  kind: 'オフライン' | 'オンライン'
  location?: string
  url?: string
  description?: string
}

// ここにイベントを追加すると Profile シーンの「イベント出演情報」に反映されます。
// 配列が空の間は「予定なし」の空状態が表示されます。
export const events: PortfolioEvent[] = []
