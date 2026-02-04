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
