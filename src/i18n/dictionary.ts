export const dictionary = {
  switcher: { ja: 'SWITCHER', en: 'SWITCHER' },
  sceneProfile: { ja: 'Profile', en: 'Profile' },
  sceneTimeline: { ja: 'Timeline', en: 'Timeline' },
  sceneFactory: { ja: 'Factory', en: 'Factory' },

  live: { ja: 'LIVE', en: 'LIVE' },
  time: { ja: 'TIME', en: 'TIME' },
  fishCount: { ja: 'FISH COUNT', en: 'FISH COUNT' },
  fishUnit: { ja: '匹', en: '' },
  depth: { ja: 'DEPTH', en: 'DEPTH' },

  timeMsgNight: { ja: '深夜稼働中... 夜更かしして開発中？', en: 'Late-night session detected... still up building?' },
  timeMsgMorning: { ja: '早朝のログを検出。今日も一日よろしくお願いします。', en: 'Early morning log detected. Have a great day.' },
  timeMsgDay: { ja: '日中の安定稼働を確認。順調です。', en: 'Stable daytime operation confirmed. All good.' },
  timeMsgEvening: { ja: '夕方のアクセスを検出。今日もお疲れさまです。', en: 'Evening access detected. Thanks for stopping by.' },
  timeMsgLate: { ja: '夜のログを記録中。そろそろ休憩も忘れずに。', en: 'Recording nighttime logs. Remember to take a break.' },

  themeToggleToLight: { ja: 'ライトモードへ', en: 'Switch to light' },
  themeToggleToDark: { ja: 'ダークモードへ', en: 'Switch to dark' },
  langToggle: { ja: 'EN', en: 'JP' },

  profileScenelabel: { ja: 'SCENE 1 / PROFILE', en: 'SCENE 1 / PROFILE' },
  skillStack: { ja: 'SKILL STACK', en: 'SKILL STACK' },
  viewTimeline: { ja: '年表を見る →', en: 'View Timeline →' },
  events: { ja: 'EVENTS / イベント出演情報', en: 'EVENTS' },
  noEvents: {
    ja: '現在予定されているイベントはありません。決まり次第ここに追加されます。',
    en: 'No events scheduled right now. This section will be updated as events are confirmed.',
  },
  eventDetail: { ja: '詳細を見る ↗', en: 'Details ↗' },

  timelineSceneLabel: { ja: 'SCENE 2 / TIMELINE', en: 'SCENE 2 / TIMELINE' },
  timelineTitle: { ja: '水流連動型 年表', en: 'Water-Flow Timeline' },
  timelineDesc: {
    ja: '年代をクリックすると、水流がファクトリーへ流れ落ちます。全て流し込むとScene 3で3D水槽が起動します。',
    en: 'Click an era to send a stream of water down to the Factory. Pour in all of them to power up the 3D tank in Scene 3.',
  },
  timelinePoured: { ja: '流し込み済み ✓', en: 'Poured in ✓' },
  timelineSelectHint: {
    ja: '年代をクリックすると、ここに詳細が表示されます。今はまだ何も選択されていません。',
    en: 'Click an era above and its details will appear here. Nothing selected yet.',
  },
  timelineSelected: { ja: '選択中の年代', en: 'Selected era' },
  factoryEnergy: { ja: 'FACTORY ENERGY', en: 'FACTORY ENERGY' },
  viewFactory: { ja: 'ファクトリーを見る →', en: 'View Factory →' },

  factorySceneLabel: { ja: 'SCENE 3 / FACTORY', en: 'SCENE 3 / FACTORY' },
  factoryTitle: { ja: '3D水槽ファクトリー', en: '3D Aquarium Factory' },
  myAquarium: { ja: 'マイ水族館', en: 'My Aquarium' },
  feedButton: { ja: 'エサをあげる 🍚', en: 'Feed 🍚' },
  milestoneQuiet: { ja: '静かな池', en: 'A quiet pond' },
  milestoneLit: { ja: '水草がライトアップ！', en: 'The plants are lit up!' },
  milestoneCreatures: { ja: '謎の生命体が混泳中', en: 'Mystery creatures are swimming around' },
  buildingTank: { ja: '3D水槽をビルド中...', en: 'Building the 3D tank...' },
  loadError: {
    ja: '3Dモデルの読み込みに失敗しました。public/models 内のファイルを確認してください。',
    en: 'Failed to load the 3D models. Please check the files in public/models.',
  },
  energyMissing: {
    ja: 'エネルギー不足: Timelineで年代をクリックして水を流し込もう',
    en: 'Not enough energy: click eras in Timeline to pour in water',
  },

  liveChatTitle: { ja: '感想放流 / LIVE CHAT', en: 'Feedback / LIVE CHAT' },
  liveChatEmpty: {
    ja: 'まだ感想はありません。最初の一匹を放流してみてください。',
    en: 'No feedback yet. Be the first to release a fish!',
  },
  namePlaceholder: { ja: '名前（任意）', en: 'Name (optional)' },
  anonymous: { ja: '匿名', en: 'Anonymous' },
  anonymousAuthor: { ja: '名もなき訪問者', en: 'Anonymous Visitor' },
  feedbackPlaceholder: { ja: '感想を放流する...', en: 'Release your feedback...' },
  releaseButton: { ja: '放流する 🐟', en: 'Release 🐟' },
  superSplash: { ja: 'Super Splash!', en: 'Super Splash!' },
  chatCollapsedLabel: { ja: 'CHAT', en: 'CHAT' },

  deepSeaTitle: { ja: '深海エリア突入', en: 'Entering the Deep Sea' },
  deepSeaDesc: {
    ja: 'スクロールするほど深く潜ります。過去の訪問者が放流した感想魚がここに眠っています。',
    en: 'Scroll further to dive deeper. Feedback fish from past visitors drift here in the dark.',
  },

  companionTitle: { ja: 'AIコンパニオン 白河零', en: 'AI Companion · Shirakawa Rei' },
  companionPlaceholder: { ja: '話しかけてみる...', en: 'Say something...' },
  companionSend: { ja: '送信', en: 'Send' },
  companionMicTitle: { ja: '音声で話しかける', en: 'Talk with your microphone' },
  companionNoSpeechRecognition: {
    ja: 'このブラウザは音声認識に対応していないみたいです。テキストで話しかけてください。',
    en: "This browser doesn't seem to support speech recognition. Please type instead.",
  },
  companionOpenLabel: { ja: 'AIコンパニオンを開く', en: 'Open AI companion' },
} as const

export type DictionaryKey = keyof typeof dictionary
