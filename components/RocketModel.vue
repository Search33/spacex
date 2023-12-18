<template>
    <div>
        <canvas ref="experience" />
    </div>
</template>

<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer, Color, Fog, AmbientLight, Vector3, Box3, DirectionalLight } from 'three'
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
    return route.path === '/' || route.path === '/rockets' || route.path === '/rockets2' || props.isVisible;
})


const experience: Ref<HTMLCanvasElement | null> = ref(null)
    
const scene = new Scene()
const { width, height } = useWindowSize()
const aspectRatio = computed(() => (width.value * 0.3) / (height.value * 0.7))
const camera = new PerspectiveCamera(props.fov ?? 75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, props.camY ?? 8, props.camZ ?? 18)
scene.add(camera)

const ambientLight = new AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)
let light = new DirectionalLight(0xffffff, 0.8)
light.position.set(7, 8, 10)
light.target.position.set(0, 0, 0)
light.castShadow = true
scene.add(light)
scene.add(light.target)


const { load } = useGLTFModel()

let currentModel: THREE.Group | null = null;

const initialise = async () => {
    console.log(`(${props.modelPath}) Attempting to Initialise model`)
    try {
        if (props.modelPath) {
            const { scene: model } = await load(props.modelPath);
            console.log(`${props.modelPath} gltf loaded`)
            model.traverse(function (child) {  // Enable shadow receiving for all objects in the model
                if (child instanceof Mesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
            const box = new Box3().setFromObject(model);  // Compute the bounding box
            const center = box.getCenter(new Vector3());  // Get the center of the bounding box
            currentModel = model;
            scene.add((model))
            console.log(`${props.modelPath} scene added`);
        }
    } catch (error) {
        console.error(`(${props.modelPath}) Error loading model:`, error)
    }
    
}

let renderer: WebGLRenderer;
let controls: OrbitControls | null = null;
let animationFrameId: number | null = null;

const setupRendererAndControls = async () => {
    // console.log(`(${props.modelPath}) setting up render`)

    await nextTick();

    if (!experience.value) {
        console.error(`(${props.modelPath}) Canvas element is not available`);
        return;
    }

    if (!renderer) {
        renderer = getRenderer(experience.value);
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
// watch(aspectRatio, updateCamera);

let sharedRenderer: WebGLRenderer | null = null;
const getRenderer = (canvas: HTMLCanvasElement): WebGLRenderer => {
    if (!sharedRenderer) {
        sharedRenderer = new WebGLRenderer({ canvas: canvas, alpha: true });
        sharedRenderer.setSize(width.value * 0.3, height.value * 0.7);
        sharedRenderer.shadowMap.enabled = true;
        sharedRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    return sharedRenderer;
}

const setupRenderer = () => {
    // console.log('Experience value:', experience.value);
    if (experience.value && !renderer) {
        renderer = getRenderer(experience.value)
        // renderer = new WebGLRenderer({ canvas: experience.value, alpha: true });
        // renderer.setSize(width.value * 0.3, height.value * 0.7);
        // renderer.shadowMap.enabled = true;
        // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}

const render = () => {
    if (!controls) {
        console.warn("Render called before controls were initialised");
        return;
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
        if (!render || !controls) {
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
        // isInitialised = true;
        isInitialising = false;
    }
}

// Initialize resources when component becomes visible
watch(() => isComponentVisible.value , async (isVisible) => {
    // console.log(`visibility changed to: ${isVisible} for model ${props.modelPath}`);
    try {
        if (isVisible) {
            // console.log(`${props.modelPath} Component is visible. Initialising now`);
            setupRenderer();
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
        // if (animationFrameId) {
        //     cancelAnimationFrame(animationFrameId);
        // }
        // Dispose of Three.js resources
        currentModel.traverse(object => {
            if (object instanceof Mesh) {
                object.geometry.dispose();
                if (object.material.isMaterial) {
                    cleanMaterial(object.material);
                }
            }
        });
        currentModel = null;
        console.log(`${props.modelPath} disposed`)
    }
    if (controls) {
        controls.dispose();
        controls = null;
    }
    isInitialised = false
}

onMounted(async() => {
    console.log(`(${props.modelPath}) onMounted triggered. isVisible:`, props.isVisible);
    setupRenderer();
    if (isComponentVisible.value) {
        console.log('Component is visible on mount. Initialising...');
        // if (renderer) {
        await initialiseResources();
        // }
    } else {
        console.log('Component is not visible on mount. Skipping initialisation.');
    }
})

onBeforeUnmount(() => {
    if (renderer === sharedRenderer) {
        sharedRenderer = null;
    }
    cleanUpResources();
    })


onUnmounted(() => {
    console.log(`${props.modelPath} Component unmounted.`);
});

const cleanMaterial = (material: THREE.Material) => {
    material.dispose();

    (material as THREE.MeshStandardMaterial).map?.dispose();
    (material as THREE.MeshStandardMaterial).lightMap?.dispose();
    (material as THREE.MeshStandardMaterial).bumpMap?.dispose();
    (material as THREE.MeshStandardMaterial).normalMap?.dispose();
    (material as THREE.MeshStandardMaterial).envMap?.dispose();
};


</script>

<style lang="scss" scoped></style>