import photo from '../assets/photos/junto.jpg'
import fishingPhoto from '../assets/photos/fishing.jpg'

export const hobby = {
  photo: fishingPhoto,
  captionJa: '趣味: 釣り',
  captionEn: 'Hobby: Fishing',
}

// 表示内容はここを編集するだけで反映されます。
export const profileJa = {
  name: 'Junto Murai',
  nameJa: '村井 洵仁',
  affiliation: 'Digital Hollywood University / DSKR Circle',
  tagline: '配信UIも、3Dも、水槽も、自分で作る。',
  photo,
  bio: [
    'ドジョウを小学5年生から研究し始め、千葉大学にて奨励賞を受賞。研究テーマは外来種問題で、判別式の構築を行った。',
    '配信活動では企画・司会進行・運営を担当。ゲーム制作サークル「DSKR」代表として複数のゲーム制作を行う。',
    '現在はAIを活用したソフトウェア開発と、AIVtuber「白河零」のプロデュース・開発を行っている。',
  ],
  skills: [
    { label: 'Streaming Software', detail: 'UTSUSHIYO (Tauri + React + VRM/Live2D)' },
    { label: '3D Modeling & Rigging', detail: 'FBX / VRM / Blender' },
    { label: 'AI VTuber Production', detail: 'AIVtuber「白河零」プロデュース・開発 / 音声合成・キャラクター制御' },
    { label: 'Biology Research', detail: 'ドジョウ研究（千葉大学 奨励賞） / 外来種問題・判別式の構築' },
    { label: 'Frontend Engineering', detail: 'React / TypeScript / Three.js / GSAP' },
  ],
  links: [{ label: 'GitHub', url: 'https://github.com/tinorajumu' }],
}

export const profileEn = {
  name: 'Junto Murai',
  nameJa: '村井 洵仁',
  affiliation: 'Digital Hollywood University / DSKR Circle',
  tagline: 'Streaming UI, 3D, aquariums — I build it all myself.',
  photo,
  bio: [
    'Started researching loach (dojo) fish in the 5th grade, later receiving a merit award at Chiba University for building a discriminant model to study invasive species.',
    'Active in live-streaming as a planner, host, and producer. Also leads the game development circle "DSKR," where he has produced multiple games.',
    'Currently builds AI-powered software and produces/develops the AI VTuber "Shirakawa Rei."',
  ],
  skills: [
    { label: 'Streaming Software', detail: 'UTSUSHIYO (Tauri + React + VRM/Live2D)' },
    { label: '3D Modeling & Rigging', detail: 'FBX / VRM / Blender' },
    { label: 'AI VTuber Production', detail: 'Producing & developing AI VTuber "Shirakawa Rei" / voice synthesis & character control' },
    { label: 'Biology Research', detail: 'Loach research (Chiba University merit award) / invasive species discriminant modeling' },
    { label: 'Frontend Engineering', detail: 'React / TypeScript / Three.js / GSAP' },
  ],
  links: [{ label: 'GitHub', url: 'https://github.com/tinorajumu' }],
}
