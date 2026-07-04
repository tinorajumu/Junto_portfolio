import * as THREE from 'three'

// Mixamo系モーションは腰(Hips)ボーンに前進移動が焼き込まれていることが多いため、
// 水槽の外へ歩き去ってしまわないようXZ方向の移動だけを取り除き、その場で動くようにする。
export function stripRootMotion(clip: THREE.AnimationClip, rootNameFragment = 'hips'): THREE.AnimationClip {
  clip.tracks.forEach((track) => {
    if (!track.name.toLowerCase().includes(rootNameFragment) || !track.name.endsWith('.position')) return
    const values = track.values
    const baseX = values[0]
    const baseZ = values[2]
    for (let i = 0; i < values.length; i += 3) {
      values[i] -= baseX
      values[i + 2] -= baseZ
    }
  })
  return clip
}
