import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, type VRM } from '@pixiv/three-vrm'

const fbxLoader = new FBXLoader()
const gltfLoader = new GLTFLoader()
gltfLoader.register((parser) => new VRMLoaderPlugin(parser))

export function loadFBX(url: string): Promise<THREE.Group> {
  return new Promise((resolve, reject) => {
    fbxLoader.load(url, resolve, undefined, reject)
  })
}

export function loadVRM(url: string): Promise<VRM> {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm as VRM
        if (!vrm) {
          reject(new Error('VRM data missing from gltf.userData'))
          return
        }
        resolve(vrm)
      },
      undefined,
      reject,
    )
  })
}

export function findBoneByName(root: THREE.Object3D, includes: string): THREE.Bone | null {
  let found: THREE.Bone | null = null
  root.traverse((child) => {
    if (found) return
    const bone = child as THREE.Bone
    if (bone.isBone && bone.name.toLowerCase().includes(includes)) {
      found = bone
    }
  })
  return found
}
