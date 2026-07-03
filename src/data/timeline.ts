export interface TimelineEra {
  id: string
  year: string
  title: string
  description: string
  energy: number // ファクトリーに流し込むエネルギー量
}

// 表示内容はここを編集するだけで反映されます。
export const timeline: TimelineEra[] = [
  {
    id: 'highschool',
    year: '高校時代',
    title: 'ドジョウの研究',
    description:
      '生物部でドジョウの行動と飼育環境を研究。観察を通じて「生き物をよく見る」姿勢が身についた、ものづくりの原点。',
    energy: 20,
  },
  {
    id: 'university',
    year: '大学入学',
    title: 'Digital Hollywood University',
    description: 'エンタメ×テクノロジーを本格的に学び始める。企画力と実装力を同時に鍛える環境に飛び込んだ。',
    energy: 25,
  },
  {
    id: 'circle',
    year: 'サークル活動',
    title: 'DSKR Circle',
    description: '仲間と共同制作を重ねる中で、個人開発と共同開発の両方の勘所を掴む。',
    energy: 20,
  },
  {
    id: 'utsushiyo',
    year: '開発',
    title: '配信ソフトウェア『UTSUSHIYO』',
    description: 'VTuber配信のためのスタンドアロンソフトを個人開発。UI/UX・3D制御・配信基盤まで一気通貫で構築。',
    energy: 30,
  },
  {
    id: 'aimascot',
    year: '開発',
    title: 'AIマスコット / 3Dモデリング',
    description: 'サーバーレスで動くローカル音声応答マスコットや、FBX/VRMを組み合わせたキャラクター制御を実装。',
    energy: 25,
  },
]
