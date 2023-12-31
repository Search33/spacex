// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { AnimationClip, AnimationMixer } from 'three'

interface GLTFExtended extends GLTF {
    mixer?: AnimationMixer;
}

export function useGLTFModel() {

    const gltfloader = new(GLTFLoader)

    function load(url: string): Promise<GLTFExtended> {
        return new Promise<GLTFExtended>((resolve, reject) => {
            // gltfloader.load(url, resolve, undefined, reject)
gltfloader.load(url, (gltf: GLTF) => {
                const extendedGltf = gltf as GLTFExtended;
                // console.log('Loaded GLTF:', extendedGltf)
                // console.log('Loaded GLTF in composable:', gltf)
                if (extendedGltf.animations && extendedGltf.animations.length) {
                    extendedGltf.mixer = new AnimationMixer(extendedGltf.scene);
                    extendedGltf.animations.forEach((clip) => {
                        extendedGltf.mixer?.clipAction(clip).play();
                    })


                }
                resolve(extendedGltf);

            }, undefined, reject)
                    })
    }
    return {
        load
    }

}

