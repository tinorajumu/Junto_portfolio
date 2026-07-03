export interface MascotRule {
  keywords: string[]
  response: string
  expression?: 'happy' | 'angry' | 'sad' | 'relaxed' | 'surprised' | 'neutral'
}

export const mascotRules: MascotRule[] = [
  {
    keywords: ['こんにちは', 'はじめまして', 'やあ', 'hello', 'hi'],
    response: 'ようこそ！このサイトの案内人です。左のスイッチャーでシーンを切り替えられますよ。',
    expression: 'happy',
  },
  {
    keywords: ['プロフィール', 'profile', '自己紹介', '経歴'],
    response: 'Scene 1: Profile を見てみてください。村井洵仁さんのバックグラウンドがまとまっています。',
    expression: 'neutral',
  },
  {
    keywords: ['年表', 'タイムライン', 'timeline', '歴史'],
    response: 'Scene 2: Timeline で年代をクリックすると、水流がファクトリーまで流れていきますよ！',
    expression: 'happy',
  },
  {
    keywords: ['工場', 'ファクトリー', 'factory', '水槽', '3d'],
    response: 'Scene 3: Factory で3D水槽が見られます。WALK / RUN / JUMP ボタンも押してみてください。',
    expression: 'surprised',
  },
  {
    keywords: ['ドジョウ', 'どじょう', '魚', 'fish'],
    response: '高校時代にドジョウの研究をしていたんです。水槽の中を今も元気に泳いでますよ。',
    expression: 'happy',
  },
  {
    keywords: ['えさ', '餌', 'エサ', 'feed'],
    response: 'コントロールパネルの「エサをあげる」ボタンでドジョウが増えていきます。50匹超えると面白いことが起きるかも？',
    expression: 'happy',
  },
  {
    keywords: ['深海', '深い', 'depth', 'スクロール'],
    response: '一番下までスクロールすると深海エリアに入れます。過去の訪問者が放流した感想魚が泳いでいますよ。',
    expression: 'surprised',
  },
  {
    keywords: ['ありがとう', 'thanks', 'thank you'],
    response: 'こちらこそ、来てくれてありがとうございます！',
    expression: 'happy',
  },
  {
    keywords: ['utsushiyo', 'うつしよ', '配信'],
    response: 'このサイトのUIは自作の配信ソフト『UTSUSHIYO』のデザインがベースになっているんです。',
    expression: 'relaxed',
  },
  {
    keywords: ['嫌い', 'つまらない', 'クソ'],
    response: 'えっ...そんなこと言わないでください...！',
    expression: 'sad',
  },
]

export const fallbackResponses: string[] = [
  'うーん、うまく聞き取れませんでした。「プロフィール」「年表」「工場」などと話しかけてみてください。',
  'もう一度お願いします！たとえば「ドジョウについて教えて」とか。',
]

export const timeOfDayMessages: { after: number; before: number; message: string }[] = [
  { after: 0, before: 5, message: '深夜稼働中... 夜更かしして開発中？' },
  { after: 5, before: 9, message: '早朝のログを検出。今日も一日よろしくお願いします。' },
  { after: 9, before: 17, message: '日中の安定稼働を確認。順調です。' },
  { after: 17, before: 22, message: '夕方のアクセスを検出。今日もお疲れさまです。' },
  { after: 22, before: 24, message: '夜のログを記録中。そろそろ休憩も忘れずに。' },
]
