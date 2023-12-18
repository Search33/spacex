<!-- <template>
    <div>
        <canvas ref="experience" />
    </div>
</template>

<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer, Color, Fog, AmbientLight, Vector3, Box3, DirectionalLight } from 'three'
import { Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import path from 'path';

const props = defineProps({
    isVisible: Boolean
})

const route = useRoute();

const isComponentVisible = computed(() => {
    return route.path === '/' || props.isVisible;
})

const experience: Ref<HTMLCanvasElement | null> = ref(null)
    
const scene = new Scene()
const { width, height } = useWindowSize()
const aspectRatio = computed(() => (width.value * 0.3) / (height.value * 0.7))
const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 4, 10)
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

const initialise = async () => {
    console.log("Attempting to Initialise F9 model")
    try {
        const { scene: model } = await load('/falcon9-v2.gltf');
        console.log('F9 gltf loaded')
        model.traverse(function (child) {  // Enable shadow receiving for all objects in the model
            if (child instanceof Mesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
        });
        const box = new Box3().setFromObject(model);  // Compute the bounding box
        const center = box.getCenter(new Vector3());  // Get the center of the bounding box
        
        scene.add((model))
        console.log('F9 scene added');
    } catch (error) {
        console.error('Error loading model:', error)
    }
    
}

let renderer: WebGLRenderer;
let controls: OrbitControls;
let animationFrameId: number;

const setupRendererAndControls = async () => {
    console.log('setting up shared render with F9')

    await nextTick();

    if (!experience.value) {
        console.error('Canvas element is not available');
        return;
    }

    // renderer = getSharedRenderer(experience.value);
    if (!renderer) {
        console.log('Failed to get shared Renderer');
        return;
    }
    console.log('Renderer initialized', renderer);

    renderer.setSize(width.value * 0.3, height.value * 0.7);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
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

const setupRenderer = () => {
    if (experience.value) {
        renderer = new WebGLRenderer({ canvas: experience.value, alpha: true });
        renderer.setSize(width.value * 0.3, height.value * 0.7);
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    console.log('initialiseResources called, isInitialised:', isInitialised);

    if (isInitialised || isInitialising) return;

    isInitialising = true;

    await nextTick();
    await setupRendererAndControls();
    await initialise();
    if (controls) {
        render();
        // registerScene(scene, camera);
        isInitialised = true;
        console.log('F9 Initialisation process completed');

    } else {
        console.error("Failed to initialise controls")
    }
    isInitialised = true;
    isInitialising = false;

}

// Initialize resources when component becomes visible
watch(() => isComponentVisible, async (isVisible) => {
    console.log('visibility changed to:', isVisible );
    if (isVisible) {
        console.log('Component is visible. Initialising...');
        setupRenderer();
        await initialiseResources();
    } else {
        cleanUpResources();
    }
});


const cleanUpResources = () => {
    if (isInitialised) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        // Dispose of Three.js resources
        scene.traverse(object => {
            if (object instanceof Mesh) {
                object.geometry.dispose();
                if (object.material.isMaterial) {
                    cleanMaterial(object.material);
                }
            }
        });
        isInitialised = false
        console.log('F9 disposed')
    }

    // if (controls) {
    //     controls.dispose();
    // }
}

onMounted(async() => {
    console.log('F9 onMounted triggered. isVisible:', props.isVisible);
    if (isComponentVisible.value) {
        console.log('Component is visible on mount. Initialising...');
        setupRenderer();
        await initialiseResources();
    } else {
        console.log('Component is not visible on mount. Skipping initialisation.');
    }
})

onBeforeUnmount(() => {
    cleanUpResources();
})


onUnmounted(() => {
    console.log('F9 Component unmounted.');
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

<style lang="scss" scoped></style> -->