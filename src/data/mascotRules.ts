export interface MascotRule {
  id: string
  keywords: string[]
  response: string
  responseEn: string
  expression?: 'happy' | 'angry' | 'sad' | 'relaxed' | 'surprised' | 'neutral'
}

// id は音声ファイル名（src/assets/voice/<id>.wav 等）と対応する。
// 生成済み音声があれば自動でそちらが再生され、なければブラウザ読み上げにフォールバックする。
export const mascotRules: MascotRule[] = [
  {
    id: 'greeting',
    keywords: ['こんにちは', 'はじめまして', 'やあ', 'hello', 'hi'],
    response: 'ようこそ！このサイトの案内人です。左のスイッチャーでシーンを切り替えられますよ。',
    responseEn: "Welcome! I'm your guide here. Use the switcher on the left to change scenes.",
    expression: 'happy',
  },
  {
    id: 'profile',
    keywords: ['プロフィール', 'profile', '自己紹介', '経歴'],
    response: 'Scene 1: Profile を見てみてください。村井洵仁さんのバックグラウンドがまとまっています。',
    responseEn: 'Check out Scene 1: Profile — it has all of Junto Murai\'s background.',
    expression: 'neutral',
  },
  {
    id: 'timeline',
    keywords: ['年表', 'タイムライン', 'timeline', '歴史'],
    response: 'Scene 2: Timeline で年代をクリックすると、水流がファクトリーまで流れていきますよ！',
    responseEn: 'In Scene 2: Timeline, clicking an era sends a stream of water down to the Factory!',
    expression: 'happy',
  },
  {
    id: 'factory',
    keywords: ['工場', 'ファクトリー', 'factory', '水槽', '3d'],
    response: 'Scene 3: Factory で3D水槽が見られます。WALK / RUN / JUMP ボタンも押してみてください。',
    responseEn: 'You can see the 3D tank in Scene 3: Factory. Try the WALK / RUN / JUMP buttons too.',
    expression: 'surprised',
  },
  {
    id: 'dojo',
    keywords: ['ドジョウ', 'どじょう', '魚', 'fish'],
    response: '高校時代にドジョウの研究をしていたんです。水槽の中を今も元気に泳いでますよ。',
    responseEn: 'He researched loach fish since elementary school. They\'re still swimming happily in the tank.',
    expression: 'happy',
  },
  {
    id: 'feed',
    keywords: ['えさ', '餌', 'エサ', 'feed'],
    response: 'コントロールパネルの「エサをあげる」ボタンでドジョウが増えていきます。50匹超えると面白いことが起きるかも？',
    responseEn: 'The "Feed" button on the control panel adds more loach. Something fun might happen past 50!',
    expression: 'happy',
  },
  {
    id: 'depth',
    keywords: ['深海', '深い', 'depth', 'スクロール'],
    response: '一番下までスクロールすると深海エリアに入れます。過去の訪問者が放流した感想魚が泳いでいますよ。',
    responseEn: 'Scroll all the way down to enter the deep sea. Feedback fish from past visitors swim there.',
    expression: 'surprised',
  },
  {
    id: 'thanks',
    keywords: ['ありがとう', 'thanks', 'thank you'],
    response: 'こちらこそ、来てくれてありがとうございます！',
    responseEn: 'Thank YOU for stopping by!',
    expression: 'happy',
  },
  {
    id: 'utsushiyo',
    keywords: ['utsushiyo', 'うつしよ', '配信'],
    response: 'このサイトのUIは自作の配信ソフト『UTSUSHIYO』のデザインがベースになっているんです。',
    responseEn: 'This site\'s UI is based on the design of "UTSUSHIYO," his own streaming software.',
    expression: 'relaxed',
  },
  {
    id: 'event',
    keywords: ['イベント', 'event', '出演', '配信予定'],
    response: 'オフライン・オンラインのイベント出演情報はProfileシーンの下の方にまとめてありますよ。',
    responseEn: 'Offline and online event appearances are listed near the bottom of the Profile scene.',
    expression: 'neutral',
  },
  {
    id: 'companion',
    keywords: ['白河零', 'しらかわ', 'コンパニオン', 'companion', 'rei'],
    response: '私、AIVtuber「白河零」です！このサイトの案内役も務めています。',
    responseEn: "I'm Shirakawa Rei, an AI VTuber! I'm also acting as your guide on this site.",
    expression: 'happy',
  },
  {
    id: 'dislike',
    keywords: ['嫌い', 'つまらない', 'クソ'],
    response: 'えっ...そんなこと言わないでください...！',
    responseEn: "Eh...? Please don't say that...!",
    expression: 'sad',
  },
]

export const fallbackResponses: { id: string; text: string; textEn: string }[] = [
  {
    id: 'fallback1',
    text: 'うーん、うまく聞き取れませんでした。「プロフィール」「年表」「工場」などと話しかけてみてください。',
    textEn: 'Hmm, I didn\'t quite catch that. Try saying "profile," "timeline," or "factory."',
  },
  {
    id: 'fallback2',
    text: 'もう一度お願いします！たとえば「ドジョウについて教えて」とか。',
    textEn: 'Could you say that again? Try something like "tell me about the loach."',
  },
]
