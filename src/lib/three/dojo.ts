import * as THREE from 'three'

export interface DojoFish {
  mesh: THREE.Group
  radius: number
  speed: number
  phase: number
  yOffset: number
  baseSpeed: number
}

function buildFishMesh(color: number, length = 0.24): THREE.Group {
  const group = new THREE.Group()
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.05,
    emissive: color,
    emissiveIntensity: 0.12,
  })

  // 胴体: 球を前後に伸ばし、上下・左右を少し潰して魚らしい紡錘形にする
  const bodyGeo = new THREE.SphereGeometry(length * 0.34, 12, 8)
  bodyGeo.scale(1.7, 0.62, 0.5)
  const body = new THREE.Mesh(bodyGeo, material)
  group.add(body)

  // 尾びれ（平たい三角形）
  const tailShape = new THREE.Shape()
  tailShape.moveTo(0, length * 0.16)
  tailShape.lineTo(-length * 0.32, 0)
  tailShape.lineTo(0, -length * 0.16)
  tailShape.closePath()
  const tail = new THREE.Mesh(new THREE.ShapeGeometry(tailShape), material)
  tail.position.x = -length * 0.52
  group.add(tail)

  // 背びれ
  const dorsalShape = new THREE.Shape()
  dorsalShape.moveTo(length * 0.08, 0)
  dorsalShape.lineTo(-length * 0.08, 0)
  dorsalShape.lineTo(0, length * 0.16)
  dorsalShape.closePath()
  const dorsal = new THREE.Mesh(new THREE.ShapeGeometry(dorsalShape), material)
  dorsal.position.set(length * 0.02, length * 0.18, 0)
  group.add(dorsal)

  // 目
  const eyeGeo = new THREE.SphereGeometry(length * 0.06, 6, 6)
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
  ;[1, -1].forEach((side) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat)
    eye.position.set(length * 0.44, length * 0.05, side * length * 0.16)
    group.add(eye)
  })

  return group
}

const DOJO_COLORS = [0xc9a06b, 0xb5895a, 0xa97c4f]

export function createDojoSchool(count: number, tankRadius: number): DojoFish[] {
  const fish: DojoFish[] = []
  for (let i = 0; i < count; i++) {
    const mesh = buildFishMesh(DOJO_COLORS[i % DOJO_COLORS.length])
    const radius = tankRadius * (0.4 + Math.random() * 0.5)
    const speed = 0.4 + Math.random() * 0.3
    fish.push({
      mesh,
      radius,
      speed,
      baseSpeed: speed,
      phase: Math.random() * Math.PI * 2,
      yOffset: Math.random() * 0.15,
    })
  }
  return fish
}

export function animateDojoSchool(fish: DojoFish[], t: number, scatter: boolean) {
  for (const f of fish) {
    const speed = scatter ? f.baseSpeed * 3.2 : f.baseSpeed
    const angle = f.phase + t * speed
    const wobble = Math.sin(t * 3 + f.phase) * 0.05
    const r = scatter ? f.radius * 1.4 : f.radius
    f.mesh.position.set(Math.cos(angle) * r, f.yOffset + wobble, Math.sin(angle) * r)
    f.mesh.rotation.y = -angle + Math.PI / 2 + Math.sin(t * 6 + f.phase) * 0.15
  }
}
