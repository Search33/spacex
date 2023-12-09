<template>
    <div>
        <canvas ref="experience" />
    </div>
</template>

<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer, Color, Fog, AmbientLight, Vector3, Box3, DirectionalLight} from 'three'
import { Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let renderer: WebGLRenderer
let controls: OrbitControls
const experience: Ref<HTMLCanvasElement | null> = ref(null)

const scene = new Scene()

const { width, height } = useWindowSize()
const aspectRatio = computed(() => (width.value * 0.3)  / (height.value * 0.7))
// const aspectRatio = computed(() => width.value  / height.value )

// const bgColour = new Color('#333333')

// scene.fog = new Fog(bgColour, 0.1, 75)

// scene.background = bgColour

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 4, 10)

scene.add(camera)
const ambientLight = new AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

let light = new DirectionalLight(0xffffff, 0.8)
light.position.set(7,8,10)
light.target.position.set(0,0,0)
light.castShadow = true
scene.add(light)
scene.add(light.target)


const { load } = useGLTFModel()

const { scene: model } = await load('/Zhuque-2.gltf')

model.traverse(function (child) {  // Enable shadow receiving for all objects in the model
    if (child instanceof Mesh) {
        child.receiveShadow = true;
        child.castShadow = true;
    }
});


const box = new Box3().setFromObject(model);  // Compute the bounding box
const center = box.getCenter(new Vector3());  // Get the center of the bounding box

// controls.target.copy(center);  // Set the controls target to the center

// model.scale.set(0.1, 0.1, 0.1)
scene.add((model))

function updateCamera() {
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
}

function updateRenderer() {
    renderer.setSize(width.value * 0.3 , height.value * 0.7)
    renderer.render(scene, camera)
}

function setRenderer() {
    if (experience.value) {
        renderer = new WebGLRenderer({ canvas: experience.value , alpha: true})
        renderer.shadowMap.enabled = true
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        // controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 1.5

        updateRenderer()
    }
}

watch(aspectRatio, () => {
    updateCamera()
    updateRenderer()
})

onMounted(() => {
    setRenderer()
    // controls.target.set(0, 5, 6)
    controls.update()
    loop()
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

</script>

<style lang="scss" scoped>

</style>