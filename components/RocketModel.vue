<template>
    <div>
        <canvas ref="experience" />
    </div>
</template>

<script setup lang="ts">
import { Scene, AnimationMixer, Clock, PerspectiveCamera, Mesh, WebGLRenderer, AmbientLight, DirectionalLight, Group, Material, MeshStandardMaterial } from 'three'
import { Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
    isVisible: Boolean,
    modelPath: String,
    fov: Number,
    camY: Number,
    camZ: Number,
})

const route = useRoute();

const isComponentVisible = computed(() => {
    return route.path === '/' || route.path === '/rockets' || route.path === '/rockets2' || route.path.startsWith('/rockets') || props.isVisible;
})

const experience: Ref<HTMLCanvasElement | null> = ref(null)

const scene = new Scene()
const { width, height } = useWindowSize()
const aspectRatio = computed(() => (width.value * 0.3) / (height.value * 0.7))
const camera = new PerspectiveCamera(props.fov ?? 75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, props.camY ?? 8, props.camZ ?? 18)
scene.add(camera)

let mixer: AnimationMixer | null = null;
const clock = new Clock();

const ambientLight = new AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)
let light = new DirectionalLight(0xffffff, 0.8)
light.position.set(7, 8, 10)
light.target.position.set(0, 0, 0)
light.castShadow = true
light.shadow.bias = -0.0005
scene.add(light)
scene.add(light.target)

const { load } = useGLTFModel()

let currentModel: Group | null = null;

const initialise = async () => {
    try {
        if (props.modelPath) {
            const { scene: model, animations: modelAnimations } = await load(props.modelPath);
            model.traverse(function (child) {
                if (child instanceof Mesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
            currentModel = model;
            scene.add((model))

            if (modelAnimations && modelAnimations.length > 0) {
                mixer = new AnimationMixer(model);
            }

        }
    } catch (error) {
        console.error(`(${props.modelPath}) Error loading model:`, error)
    }

}

let renderer: WebGLRenderer;
let controls: OrbitControls | null = null;
let animationFrameId: number | null = null;

const setupRendererAndControls = async () => {
    await nextTick();

    if (!experience.value) {
        console.error(`(${props.modelPath}) Canvas element is not available`);
        return;
    }

    if (!renderer) {
        renderer = new WebGLRenderer({ canvas: experience.value, alpha: true });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width.value * 0.3, height.value * 0.7);
    }

    if (!controls) {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;

        controls.enablePan = true;
        controls.panSpeed = 0.5;

        controls.enableRotate = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;

        controls.minDistance = 3;
        controls.maxDistance = 20;
    } else {
        controls.update();
    }
}

const updateCamera = () => {
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
}

watch(aspectRatio, () => {
    updateCamera();
    renderer.setSize(width.value * 0.3, height.value * 0.7)
})

const render = () => {
    if (!controls) {
        console.warn("Render called before controls were initialised");
        return;
    }
    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }

    controls.update();
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(render)
}

let isInitialised = false;
let isInitialising = false;

const initialiseResources = async () => {
    if (isInitialised || isInitialising) return;
    isInitialising = true;

    try {
        await nextTick();
        if (!renderer || !controls) {
            setupRendererAndControls();
        }
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        await initialise();
        if (controls) {
            render();
            isInitialised = true;
        } else {
            console.error("Failed to initialise controls")
        }
    } catch (error) {
        console.error('Error during initialisation:', error);
    } finally {
        isInitialising = false;
    }
}

// Initialize resources when component becomes visible
watch(() => isComponentVisible.value, async (isVisible) => {
    try {
        if (isVisible) {
            if (!isInitialised) {
                await initialiseResources();
            }
        } else {
            cleanUpResources();
        }
    } catch (error) {
        console.error('Error during visibility change handling:', error)
    }
}, { immediate: true });

const cleanUpResources = () => {

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (currentModel) {
        scene.remove(currentModel);
        currentModel.traverse(object => {
            if (object instanceof Mesh) {
                object.geometry.dispose();
                if (object.material.isMaterial) {
                    cleanMaterial(object.material);
                }
            }
        });
        currentModel = null;
    }
    if (mixer) {
        mixer.stopAllAction();
        mixer = null;
    }
    if (controls) {
        controls.dispose();
        controls = null;
    }
    isInitialised = false
}

onMounted(async () => {
    if (isComponentVisible.value) {
        await initialiseResources();
    }
})

onBeforeUnmount(() => {
    cleanUpResources();
})


const cleanMaterial = (material: Material) => {
    material.dispose();

    (material as MeshStandardMaterial).map?.dispose();
    (material as MeshStandardMaterial).lightMap?.dispose();
    (material as MeshStandardMaterial).bumpMap?.dispose();
    (material as MeshStandardMaterial).normalMap?.dispose();
    (material as MeshStandardMaterial).envMap?.dispose();
};


</script>

<style lang="scss" scoped></style>