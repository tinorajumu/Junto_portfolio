import * as THREE from 'three'

export interface DojoFish {
  mesh: THREE.Group
  radius: number
  speed: number
  phase: number
  yOffset: number
  baseSpeed: number
}

function buildFishMesh(color: number, length = 0.22): THREE.Group {
  const group = new THREE.Group()
  const bodyGeo = new THREE.CapsuleGeometry(length * 0.18, length * 0.6, 3, 6)
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1, emissive: color, emissiveIntensity: 0.15 })
  const body = new THREE.Mesh(bodyGeo, material)
  body.rotation.z = Math.PI / 2
  group.add(body)

  const tailGeo = new THREE.ConeGeometry(length * 0.18, length * 0.3, 6)
  const tail = new THREE.Mesh(tailGeo, material)
  tail.position.x = -length * 0.55
  tail.rotation.z = Math.PI / 2
  group.add(tail)

  return group
}

export function createDojoSchool(count: number, tankRadius: number, color = 0xd9a86c): DojoFish[] {
  const fish: DojoFish[] = []
  for (let i = 0; i < count; i++) {
    const mesh = buildFishMesh(color)
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
    f.mesh.rotation.y = -angle + Math.PI / 2
  }
}
