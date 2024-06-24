<template>
    <div>
        <canvas ref="experience" />
        <!-- below works -->
        <!-- <div v-if="hasAnimations">
            <button v-if="!isAnimationPlaying" @click="playAnimation">Play animation</button>
            <button v-else @click="stopAnimation">Stop animation</button>
        </div>
        <button v-else @click="rotateModel">Rotate</button> -->
    </div>
</template>

<script setup lang="ts">
import { Scene, AnimationMixer, Clock, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer, Color, Fog, AmbientLight, Vector3, Box3, DirectionalLight } from 'three'
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
let animations: THREE.AnimationClip[] = [];
const clock = new Clock();
const hasAnimations = ref(false);
const isAnimationPlaying = ref(false);

const ambientLight = new AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)
let light = new DirectionalLight(0xffffff, 0.8)
light.position.set(7, 8, 10)
light.target.position.set(0, 0, 0)
light.castShadow = true
light.shadow.bias = -0.0005
// light.shadow.radius = 2
scene.add(light)
scene.add(light.target)

const { load } = useGLTFModel()

let currentModel: THREE.Group | null = null;

const initialise = async () => {
    try {
        if (props.modelPath) {
            const { scene: model, animations: modelAnimations } = await load(props.modelPath);
            console.log(`${props.modelPath} loaded`)
            model.traverse(function (child) {
                if (child instanceof Mesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            });
            const box = new Box3().setFromObject(model);
            const center = box.getCenter(new Vector3());
            currentModel = model;
            scene.add((model))

            if (modelAnimations && modelAnimations.length > 0) {
                animations = modelAnimations;
                mixer = new AnimationMixer(model);
                hasAnimations.value = true;
                console.log(`${modelAnimations.length} animations loaded for ${props.modelPath}`);
            } else {
                hasAnimations.value = false;
                console.log(`No animations found for ${props.modelPath}`);
            }

        }
    } catch (error) {
        console.error(`(${props.modelPath}) Error loading model:`, error)
    }

}

const playAnimation = () => {
    if (mixer && animations.length > 0) {
        mixer.stopAllAction();
        const action = mixer.clipAction(animations[0]);
        action.reset();
        action.play();
        isAnimationPlaying.value = true;
        console.log('Animation started');
    } else {
        console.log('No animations available for this model');
        // Optionally, you could trigger some default behavior here
        // For example, rotating the model:
        if (currentModel) {
            rotateModel();
        }
    }
}
const stopAnimation = () => {
    if (mixer) {
        mixer.stopAllAction();
        isAnimationPlaying.value = false;
        console.log('Animation stopped');
    }
}

const rotateModel = () => {
    if (currentModel) {
        const rotationAnimation = () => {
            currentModel!.rotation.y += 0.01;
            requestAnimationFrame(rotationAnimation);
        };
        rotationAnimation();
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
    if (experience.value && !renderer) {
        renderer = getRenderer(experience.value)
    }
}

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
        isInitialising = false;
    }
}

// Initialize resources when component becomes visible
watch(() => isComponentVisible.value, async (isVisible) => {
    // console.log(`visibility changed to: ${isVisible} for model ${props.modelPath}`);
    try {
        if (isVisible) {
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
    if (mixer) {
        mixer.stopAllAction();
        mixer = null;
    }
    hasAnimations.value = false;
    isAnimationPlaying.value = false;

    if (controls) {
        controls.dispose();
        controls = null;
    }
    isInitialised = false
}

onMounted(async () => {
    setupRenderer();
    if (isComponentVisible.value) {
        await initialiseResources();
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