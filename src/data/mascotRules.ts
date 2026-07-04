export interface MascotRule {
  id: string
  keywords: string[]
  response: string
  expression?: 'happy' | 'angry' | 'sad' | 'relaxed' | 'surprised' | 'neutral'
}

// id は音声ファイル名（src/assets/voice/<id>.wav 等）と対応する。
// 生成済み音声があれば自動でそちらが再生され、なければブラウザ読み上げにフォールバックする。
export const mascotRules: MascotRule[] = [
  {
    id: 'greeting',
    keywords: ['こんにちは', 'はじめまして', 'やあ', 'hello', 'hi'],
    response: 'ようこそ！このサイトの案内人です。左のスイッチャーでシーンを切り替えられますよ。',
    expression: 'happy',
  },
  {
    id: 'profile',
    keywords: ['プロフィール', 'profile', '自己紹介', '経歴'],
    response: 'Scene 1: Profile を見てみてください。村井洵仁さんのバックグラウンドがまとまっています。',
    expression: 'neutral',
  },
  {
    id: 'timeline',
    keywords: ['年表', 'タイムライン', 'timeline', '歴史'],
    response: 'Scene 2: Timeline で年代をクリックすると、水流がファクトリーまで流れていきますよ！',
    expression: 'happy',
  },
  {
    id: 'factory',
    keywords: ['工場', 'ファクトリー', 'factory', '水槽', '3d'],
    response: 'Scene 3: Factory で3D水槽が見られます。WALK / RUN / JUMP ボタンも押してみてください。',
    expression: 'surprised',
  },
  {
    id: 'dojo',
    keywords: ['ドジョウ', 'どじょう', '魚', 'fish'],
    response: '高校時代にドジョウの研究をしていたんです。水槽の中を今も元気に泳いでますよ。',
    expression: 'happy',
  },
  {
    id: 'feed',
    keywords: ['えさ', '餌', 'エサ', 'feed'],
    response: 'コントロールパネルの「エサをあげる」ボタンでドジョウが増えていきます。50匹超えると面白いことが起きるかも？',
    expression: 'happy',
  },
  {
    id: 'depth',
    keywords: ['深海', '深い', 'depth', 'スクロール'],
    response: '一番下までスクロールすると深海エリアに入れます。過去の訪問者が放流した感想魚が泳いでいますよ。',
    expression: 'surprised',
  },
  {
    id: 'thanks',
    keywords: ['ありがとう', 'thanks', 'thank you'],
    response: 'こちらこそ、来てくれてありがとうございます！',
    expression: 'happy',
  },
  {
    id: 'utsushiyo',
    keywords: ['utsushiyo', 'うつしよ', '配信'],
    response: 'このサイトのUIは自作の配信ソフト『UTSUSHIYO』のデザインがベースになっているんです。',
    expression: 'relaxed',
  },
  {
    id: 'event',
    keywords: ['イベント', 'event', '出演', '配信予定'],
    response: 'オフライン・オンラインのイベント出演情報はProfileシーンの下の方にまとめてありますよ。',
    expression: 'neutral',
  },
  {
    id: 'dislike',
    keywords: ['嫌い', 'つまらない', 'クソ'],
    response: 'えっ...そんなこと言わないでください...！',
    expression: 'sad',
  },
]

export const fallbackResponses: { id: string; text: string }[] = [
  { id: 'fallback1', text: 'うーん、うまく聞き取れませんでした。「プロフィール」「年表」「工場」などと話しかけてみてください。' },
  { id: 'fallback2', text: 'もう一度お願いします！たとえば「ドジョウについて教えて」とか。' },
]

export const timeOfDayMessages: { after: number; before: number; message: string }[] = [
  { after: 0, before: 5, message: '深夜稼働中... 夜更かしして開発中？' },
  { after: 5, before: 9, message: '早朝のログを検出。今日も一日よろしくお願いします。' },
  { after: 9, before: 17, message: '日中の安定稼働を確認。順調です。' },
  { after: 17, before: 22, message: '夕方のアクセスを検出。今日もお疲れさまです。' },
  { after: 22, before: 24, message: '夜のログを記録中。そろそろ休憩も忘れずに。' },
]
