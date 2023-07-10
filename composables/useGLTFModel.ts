// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function useGLTFModel() {

    const gltfloader = new(GLTFLoader)

    function load(url: string) {
        return new Promise((resolve, reject) => {
            gltfloader.load(url, resolve, undefined, reject)
        })
    }

    // gltfloader.load('/rockets/Atlas_V_401.gltf', (gltf) => {
    // console.log(gltf)
    // scene.add(gltf.scene)

    return {
        load,
    }

}

