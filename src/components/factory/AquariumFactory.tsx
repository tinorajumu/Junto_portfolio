import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { VRM } from '@pixiv/three-vrm'
import { findBoneByName, loadFBX, loadVRM } from '../../lib/three/loaders'
import { stripRootMotion } from '../../lib/three/motion'
import { animateDojoSchool, createDojoSchool, type DojoFish } from '../../lib/three/dojo'
import { usePortfolio } from '../../lib/PortfolioContext'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Expression, MotionName } from '../../lib/types'

const BASE = import.meta.env.BASE_URL
const MOTION_FILES: Record<MotionName, string> = {
  idle: `${BASE}models/motion/idle.fbx`,
  walk: `${BASE}models/motion/walk.fbx`,
  run: `${BASE}models/motion/run.fbx`,
  jump: `${BASE}models/motion/jump.fbx`,
}
const BODY_URL = `${BASE}models/body.fbx`
const MASK_URL = `${BASE}models/mask.vrm`

// AIVtuberプロジェクト(animator.js)と同じ方式: マスクはFBXの骨に直接ぶら下げず、
// 毎フレーム頭ボーンのワールド座標を追跡してVRMシーンを独立に配置する。
const MASK_SIZE_RATIO = 1.0
const MASK_OFFSET_Z = -0.1
const MASK_OFFSET_Y = 0.0
const EXPRESSION_PRESETS: Expression[] = ['happy', 'angry', 'sad', 'relaxed', 'surprised', 'neutral']

interface Scene3D {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  mixer: THREE.AnimationMixer | null
  actions: Partial<Record<MotionName, THREE.AnimationAction>>
  body: THREE.Group | null
  vrm: VRM | null
  headBone: THREE.Bone | null
  maskHeadOffset: THREE.Vector3
  dojo: DojoFish[]
  dojoGroup: THREE.Group
  plantsGroup: THREE.Group
  creaturesGroup: THREE.Group
  waterMesh: THREE.Mesh
  waterBasePositions: Float32Array
  pointLight: THREE.PointLight
  clock: THREE.Clock
  scatterUntil: number
  buildStart: number
  built: boolean
  frameId: number
}

export default function AquariumFactory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<Scene3D | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [motion, setMotionState] = useState<MotionName>('idle')
  const [expression, setExpressionState] = useState<Expression>('neutral')

  const { feedCount, jumpSignal, thanksSignal, triggerJump, factoryEnergy, totalEnergy } = usePortfolio()
  const { t } = useLanguage()
  const built = factoryEnergy >= totalEnergy

  // --- 初期化: レンダラー/シーン/モデルの読み込み（マウント時に一度だけ） ---
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let disposed = false

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x03121a, 0.05)

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 1.5, 4.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 1.0, 0)
    controls.minDistance = 2
    controls.maxDistance = 7
    controls.maxPolarAngle = Math.PI * 0.55
    controls.enablePan = false

    scene.add(new THREE.HemisphereLight(0x8fd6e8, 0x03121a, 0.9))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1)
    dirLight.position.set(2, 4, 2)
    dirLight.castShadow = true
    scene.add(dirLight)
    const pointLight = new THREE.PointLight(0x5df2d6, 0, 6)
    pointLight.position.set(0, 1.2, 0)
    scene.add(pointLight)

    // 水槽カプセル（ガラス）
    const capsule = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 2.6, 32, 1, true),
      new THREE.MeshPhysicalMaterial({
        color: 0x5df2d6,
        transparent: true,
        opacity: 0.08,
        roughness: 0.1,
        metalness: 0,
        side: THREE.DoubleSide,
        transmission: 0.9,
      }),
    )
    capsule.position.y = 1.3
    scene.add(capsule)

    // 水面（アニメーションする水槽の底）
    const waterGeo = new THREE.PlaneGeometry(3, 3, 48, 48)
    waterGeo.rotateX(-Math.PI / 2)
    const waterMesh = new THREE.Mesh(
      waterGeo,
      new THREE.MeshStandardMaterial({ color: 0x0a3d4a, transparent: true, opacity: 0.75, roughness: 0.3 }),
    )
    waterMesh.position.y = 0.02
    scene.add(waterMesh)
    const waterBasePositions = Float32Array.from(waterGeo.attributes.position.array)

    const dojoGroup = new THREE.Group()
    scene.add(dojoGroup)
    const dojo = createDojoSchool(3, 1.2)
    dojo.forEach((f) => dojoGroup.add(f.mesh))

    // サイバーな水草（30匹達成で表示）
    const plantsGroup = new THREE.Group()
    plantsGroup.visible = false
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const plant = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.5 + Math.random() * 0.3, 6),
        new THREE.MeshStandardMaterial({ color: 0x39e6c2, emissive: 0x1a8f78, emissiveIntensity: 0.6 }),
      )
      plant.position.set(Math.cos(angle) * 1.3, 0.2, Math.sin(angle) * 1.3)
      plantsGroup.add(plant)
    }
    scene.add(plantsGroup)

    // 謎の生命体（50匹達成で表示）
    const creaturesGroup = new THREE.Group()
    creaturesGroup.visible = false
    const creatureGeos = [new THREE.IcosahedronGeometry(0.12, 0), new THREE.TorusKnotGeometry(0.08, 0.03, 60, 8)]
    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(
        creatureGeos[i % creatureGeos.length],
        new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.7, 0.55),
          emissive: 0x220044,
          emissiveIntensity: 0.4,
        }),
      )
      creaturesGroup.add(mesh)
    }
    scene.add(creaturesGroup)

    const state: Scene3D = {
      renderer,
      scene,
      camera,
      controls,
      mixer: null,
      actions: {},
      body: null,
      vrm: null,
      headBone: null,
      maskHeadOffset: new THREE.Vector3(),
      dojo,
      dojoGroup,
      plantsGroup,
      creaturesGroup,
      waterMesh,
      waterBasePositions,
      pointLight,
      clock: new THREE.Clock(),
      scatterUntil: 0,
      buildStart: 0,
      built: false,
      frameId: 0,
    }
    sceneRef.current = state

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const maskTargetPos = new THREE.Vector3()
    const maskTargetQuat = new THREE.Quaternion()

    const animate = () => {
      state.frameId = requestAnimationFrame(animate)
      const delta = state.clock.getDelta()
      const t = state.clock.getElapsedTime()
      state.mixer?.update(delta)
      state.vrm?.update(delta)

      // AIVtuber方式: FBXの頭ボーンのワールド座標にVRMお面シーンを毎フレーム追従させる
      if (state.vrm && state.headBone) {
        state.headBone.getWorldPosition(maskTargetPos)
        state.headBone.getWorldQuaternion(maskTargetQuat)
        state.vrm.scene.quaternion.copy(maskTargetQuat)
        state.vrm.scene.rotateY(Math.PI)
        const rotatedOffset = state.maskHeadOffset
          .clone()
          .multiplyScalar(MASK_SIZE_RATIO)
          .applyQuaternion(state.vrm.scene.quaternion)
        state.vrm.scene.position.copy(maskTargetPos).sub(rotatedOffset)
        state.vrm.scene.translateZ(MASK_OFFSET_Z)
        state.vrm.scene.translateY(MASK_OFFSET_Y)
      }

      const scattering = performance.now() < state.scatterUntil
      animateDojoSchool(state.dojo, t, scattering)

      const pos = waterMesh.geometry.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const bx = state.waterBasePositions[i * 3]
        const bz = state.waterBasePositions[i * 3 + 2]
        const y = Math.sin(bx * 1.6 + t * 1.4) * 0.03 + Math.cos(bz * 1.6 + t * 1.1) * 0.03
        pos.setY(i, y)
      }
      pos.needsUpdate = true
      waterMesh.geometry.computeVertexNormals()

      if (state.body) {
        if (state.buildStart > 0) {
          const p = Math.min(1, (performance.now() - state.buildStart) / 600)
          const bounce = p < 1 ? 0.6 + 0.4 * (1 + Math.sin(p * Math.PI * 3) * (1 - p)) : 1
          state.body.scale.setScalar(0.01 * bounce)
          if (p >= 1) state.buildStart = 0
        }
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // --- モデル読み込み ---
    ;(async () => {
      try {
        const [body, idleClip, walkClip, runClip, jumpClip, vrm] = await Promise.all([
          loadFBX(BODY_URL),
          loadFBX(MOTION_FILES.idle),
          loadFBX(MOTION_FILES.walk),
          loadFBX(MOTION_FILES.run),
          loadFBX(MOTION_FILES.jump),
          loadVRM(MASK_URL),
        ])
        if (disposed) return

        body.scale.set(0.01, 0.01, 0.01)
        body.traverse((c) => {
          const mesh = c as THREE.SkinnedMesh
          if (mesh.isMesh) {
            mesh.castShadow = true
            mesh.receiveShadow = true
          }
        })
        scene.add(body)

        const mixer = new THREE.AnimationMixer(body)
        const actions: Partial<Record<MotionName, THREE.AnimationAction>> = {}
        const bind = (name: MotionName, clip: THREE.Group, inPlace: boolean) => {
          const anim = clip.animations[0]
          if (!anim) return
          const action = mixer.clipAction(inPlace ? stripRootMotion(anim) : anim, body)
          action.enabled = true
          actions[name] = action
        }
        bind('idle', idleClip, false)
        bind('walk', walkClip, true)
        bind('run', runClip, true)
        bind('jump', jumpClip, true)
        actions.idle?.play()

        // AIVtuber方式: マスクはFBXの骨に親子付けせず、シーン直下に独立して置き、
        // 毎フレームFBX頭ボーンのワールド座標を追跡する（animate内で実施）。
        const headBone = findBoneByName(body, 'head')
        vrm.scene.scale.setScalar(MASK_SIZE_RATIO)
        vrm.scene.updateMatrixWorld(true)
        const vrmHeadBone = vrm.humanoid?.getRawBoneNode('head')
        const maskHeadOffset = new THREE.Vector3()
        if (vrmHeadBone) {
          vrmHeadBone.getWorldPosition(maskHeadOffset)
        }
        // このモデルはSKIN(肌)マテリアルのテクスチャUVが正しく展開されておらず、
        // そのままだと真っ白に描画されてしまう。お面として視認できるよう
        // 肌色のティントを直接載せて「お面をつけている」ことが分かるようにする。
        // FaceMouth(口内)メッシュはあごの下に肥大表示される不具合があるため非表示のまま。
        vrm.scene.traverse((child) => {
          const mesh = child as THREE.Mesh
          if (!(mesh as any).isMesh) return
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((mat) => {
            const name = mat?.name?.toUpperCase() ?? ''
            if (name.includes('FACEMOUTH')) {
              mesh.visible = false
            } else if (name.includes('_SKIN') && (mat as THREE.MeshStandardMaterial).color) {
              ;(mat as THREE.MeshStandardMaterial).color.setHex(0xf0dcc8)
            }
          })
        })
        scene.add(vrm.scene)

        state.mixer = mixer
        state.actions = actions
        state.body = body
        state.vrm = vrm
        state.headBone = headBone
        state.maskHeadOffset = maskHeadOffset

        setLoading(false)
      } catch (err) {
        console.error('[AquariumFactory] failed to load models', err)
        if (!disposed) setError(true)
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(state.frameId)
      ro.disconnect()
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
      sceneRef.current = null
    }
  }, [])

  // ビルド状態（年表エネルギー到達）の反映
  // 仕様書通り「エネルギーが溜まるまでモデルは出現しない」を採用し、
  // 半透明プレビューではなく可視/不可視の切り替えにする
  // （マルチマテリアルのモデルでopacityを下げると意図せず消えてしまうため）。
  useEffect(() => {
    const state = sceneRef.current
    if (!state || !state.body) return

    state.body.visible = built
    if (state.vrm) state.vrm.scene.visible = built
    if (built && !state.built) {
      state.buildStart = performance.now()
    }
    if (!built) {
      state.body.scale.setScalar(0.01)
    }
    state.built = built
  }, [built, loading])

  // モーション切り替え
  useEffect(() => {
    const state = sceneRef.current
    if (!state) return
    const nextAction = state.actions[motion]
    if (!nextAction) return
    Object.entries(state.actions).forEach(([name, action]) => {
      if (name !== motion) action?.fadeOut(0.25)
    })
    nextAction.reset().fadeIn(0.25).play()
  }, [motion, loading])

  // 表情変更
  useEffect(() => {
    const state = sceneRef.current
    const manager = state?.vrm?.expressionManager
    if (!manager) return
    EXPRESSION_PRESETS.forEach((preset) => manager.setValue(preset, preset === expression ? 1 : 0))
  }, [expression, loading])

  // JUMPシグナル: ジャンプモーション + ドジョウ散乱 + idleへ復帰
  useEffect(() => {
    const state = sceneRef.current
    if (!state || jumpSignal === 0 || !built) return
    const jumpAction = state.actions.jump
    const returnTo = state.actions[motion] ?? state.actions.idle
    if (jumpAction) {
      jumpAction.reset()
      jumpAction.setLoop(THREE.LoopOnce, 1)
      jumpAction.clampWhenFinished = true
      Object.values(state.actions).forEach((a) => a !== jumpAction && a?.fadeOut(0.15))
      jumpAction.fadeIn(0.15).play()
      const mixer = state.mixer
      const onFinished = () => {
        returnTo?.reset().fadeIn(0.3).play()
        mixer?.removeEventListener('finished', onFinished)
      }
      mixer?.addEventListener('finished', onFinished)
    }
    state.scatterUntil = performance.now() + 1400
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpSignal])

  // 感謝リアクション: うれしい表情を一時的に表示
  useEffect(() => {
    const state = sceneRef.current
    const manager = state?.vrm?.expressionManager
    if (!manager || thanksSignal === 0) return
    manager.setValue('happy', 1)
    const timer = setTimeout(() => {
      EXPRESSION_PRESETS.forEach((preset) => manager.setValue(preset, preset === expression ? 1 : 0))
    }, 1800)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thanksSignal])

  // エサやりカウントによる水族館の成長
  useEffect(() => {
    const state = sceneRef.current
    if (!state) return
    const desiredDojo = Math.min(12, 1 + Math.min(feedCount, 10))
    if (desiredDojo !== state.dojo.length) {
      state.dojo.forEach((f) => state.dojoGroup.remove(f.mesh))
      const fresh = createDojoSchool(desiredDojo, 1.2)
      fresh.forEach((f) => state.dojoGroup.add(f.mesh))
      state.dojo = fresh
    }
    const lit = feedCount >= 30
    state.plantsGroup.visible = lit
    state.pointLight.intensity = lit ? 1.4 : 0
    state.creaturesGroup.visible = feedCount >= 50
  }, [feedCount, loading])

  // 謎の生命体をゆっくり泳がせる
  useEffect(() => {
    const state = sceneRef.current
    if (!state) return
    let raf = 0
    const tick = () => {
      const t = performance.now() / 1000
      state.creaturesGroup.children.forEach((mesh, i) => {
        const angle = t * 0.5 + (i * Math.PI * 2) / state.creaturesGroup.children.length
        mesh.position.set(Math.cos(angle) * 0.9, 1.6 + Math.sin(t + i) * 0.1, Math.sin(angle) * 0.9)
        mesh.rotation.y += 0.02
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [loading])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-rig-bg/80 text-sm text-gray-400">
          {t('buildingTank')}
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-rig-bg/90 p-6 text-center text-sm text-live">
          {t('loadError')}
        </div>
      )}
      {!loading && !error && !built && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-sm border border-gold/50 bg-rig-panel/90 px-3 py-1.5 text-xs text-gold">
          {t('energyMissing')}
        </div>
      )}

      {!loading && !error && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-2">
          <button
            disabled={!built}
            onClick={() => setMotionState('idle')}
            className={`rig-panel rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider disabled:opacity-30 ${
              motion === 'idle' ? 'border-gold text-gold' : 'border-rig-border text-gray-300 hover:border-gold/60'
            }`}
          >
            stop
          </button>
          {(['walk', 'run', 'jump'] as MotionName[]).map((m) => (
            <button
              key={m}
              disabled={!built}
              onClick={() => (m === 'jump' ? triggerJump() : setMotionState(m))}
              className={`rig-panel rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider disabled:opacity-30 ${
                motion === m && m !== 'jump' ? 'border-gold text-gold' : 'border-rig-border text-gray-300 hover:border-gold/60'
              }`}
            >
              {m}
            </button>
          ))}
          {(['happy', 'angry', 'sad', 'relaxed'] as Expression[]).map((exp) => (
            <button
              key={exp}
              disabled={!built}
              onClick={() => setExpressionState(exp)}
              className={`rig-panel rounded-sm border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider disabled:opacity-30 ${
                expression === exp ? 'border-gold text-gold' : 'border-rig-border text-gray-300 hover:border-gold/60'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
