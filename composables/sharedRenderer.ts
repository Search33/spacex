import { WebGLRenderer } from 'three';

let sharedRenderer: WebGLRenderer | null = null;

export function getSharedRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
    if (!sharedRenderer) {
        sharedRenderer = new WebGLRenderer({ canvas, alpha: true });
        sharedRenderer.shadowMap.enabled = true;
        sharedRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    return sharedRenderer;
}

// composables/useSharedRenderer.js
// import { ref, onBeforeUnmount } from 'vue';
// // import { WebGLRenderer } from 'three';

// const sharedRenderer = ref(null);
// const componentCount = ref(0);

// export function useSharedRenderer() {
//     const initialiseRenderer = (canvas) => {
//         if (!sharedRenderer.value) {
//             sharedRenderer.value = new WebGLRenderer({ canvas });
//         }
//     };

//     const incrementComponentCount = () => {
//         componentCount.value++;
//     };

//     const decrementComponentCount = () => {
//         componentCount.value--;
//         if (componentCount.value === 0) {
//             // Perform cleanup if needed
//         }
//     };

//     onBeforeUnmount(() => {
//         decrementComponentCount();
//     });

//     return { sharedRenderer, initialiseRenderer, incrementComponentCount, decrementComponentCount };
// }
