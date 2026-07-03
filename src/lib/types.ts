export interface FeedbackFish {
  id: string
  text: string
  author: string
  createdAt: number
  hue: number
}

export type SceneId = 'profile' | 'timeline' | 'factory'

export type MotionName = 'idle' | 'walk' | 'run' | 'jump'

export type Expression = 'happy' | 'angry' | 'sad' | 'relaxed' | 'surprised' | 'neutral'
