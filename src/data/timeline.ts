import dojo1 from '../assets/photos/dojo-1.jpg'
import dojo2 from '../assets/photos/dojo-2.jpg'
import research1 from '../assets/photos/research-1.jpg'
import research2 from '../assets/photos/research-2.jpg'

export interface TimelineEra {
  id: string
  year: { ja: string; en: string }
  title: { ja: string; en: string }
  description: { ja: string; en: string }
  energy: number // ファクトリーに流し込むエネルギー量
  images?: string[]
}

// 表示内容はここを編集するだけで反映されます。
export const timeline: TimelineEra[] = [
  {
    id: 'highschool',
    year: { ja: '小学5年生〜', en: 'Since 5th grade' },
    title: { ja: 'ドジョウの研究', en: 'Loach (Dojo) Research' },
    description: {
      ja: '小学5年生からドジョウの行動と飼育環境を研究。千葉大学にて奨励賞を受賞し、外来種問題をテーマにした判別式の構築を行った。「生き物をよく見る」姿勢が身についた、ものづくりの原点。',
      en: 'Researching loach behavior and habitats since 5th grade, culminating in a merit award at Chiba University for building a discriminant model addressing invasive species. The origin of a "look closely at living things" mindset that still drives his creative work.',
    },
    energy: 20,
    images: [dojo1, dojo2, research1, research2],
  },
  {
    id: 'university',
    year: { ja: '大学入学', en: 'University' },
    title: { ja: 'Digital Hollywood University', en: 'Digital Hollywood University' },
    description: {
      ja: 'エンタメ×テクノロジーを本格的に学び始める。企画力と実装力を同時に鍛える環境に飛び込んだ。',
      en: 'Began studying the intersection of entertainment and technology, sharpening both planning and implementation skills.',
    },
    energy: 25,
  },
  {
    id: 'circle',
    year: { ja: 'サークル活動', en: 'Circle Activities' },
    title: { ja: 'DSKR Circle', en: 'DSKR Circle' },
    description: {
      ja: '仲間と共同制作を重ねる中で、個人開発と共同開発の両方の勘所を掴む。ゲーム制作サークル「DSKR」代表として複数のゲーム制作を行う。',
      en: 'Through collaborative projects with peers, learned the ropes of both solo and team development. Leads the game development circle "DSKR," producing multiple games.',
    },
    energy: 20,
  },
  {
    id: 'utsushiyo',
    year: { ja: '開発', en: 'Development' },
    title: { ja: '配信ソフトウェア『UTSUSHIYO』', en: 'Streaming Software "UTSUSHIYO"' },
    description: {
      ja: 'VTuber配信のためのスタンドアロンソフトを個人開発。UI/UX・3D制御・配信基盤まで一気通貫で構築。',
      en: 'Solo-developed a standalone app for VTuber streaming, building everything from UI/UX to 3D control and the streaming pipeline.',
    },
    energy: 30,
  },
  {
    id: 'aivtuber',
    year: { ja: '開発', en: 'Development' },
    title: { ja: 'AIVtuber『白河零』のプロデュース', en: 'Producing AI VTuber "Shirakawa Rei"' },
    description: {
      ja: 'AIを活用したソフトウェア開発を行いながら、AIVtuber「白河零」のプロデュース・開発を担当。FBX/VRMを組み合わせたキャラクター制御やローカル音声応答も実装。',
      en: 'Builds AI-powered software while producing and developing the AI VTuber "Shirakawa Rei," combining FBX/VRM character control with local voice response.',
    },
    energy: 25,
  },
]
