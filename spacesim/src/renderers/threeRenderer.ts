import * as THREE from 'three';
import { RenderPayload } from './types';
import type { EventBus } from '../core/eventBus';
import { OverlayRenderer } from './overlayRenderer';

export class ThreeRenderer {
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private bodies = new Map<
    RenderPayload['bodies'][number],
    { mesh: THREE.Mesh; label: THREE.Sprite }
  >();
  private overlay: OverlayRenderer;

  constructor(canvas: HTMLCanvasElement, bus: EventBus<{ render: RenderPayload }>) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.width, canvas.height);
    this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.z = 300;
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(200, 200, 200);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    this.scene.add(light);
    this.overlay = new OverlayRenderer(this.scene);
    bus.on('render', (p) => this.draw(p));
  }

  private createLabel(text: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.font = '12px sans-serif';
    const w = ctx.measureText(text).width + 2;
    canvas.width = w;
    canvas.height = 16;
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(text, 1, 12);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(w, 16, 1);
    return sprite;
  }

  private syncBodies(bodies: RenderPayload['bodies']) {
    const set = new Set(bodies);
    for (const [b, obj] of Array.from(this.bodies)) {
      if (!set.has(b)) {
        this.scene.remove(obj.mesh);
        this.scene.remove(obj.label);
        (obj.mesh.material as THREE.Material).dispose();
        obj.mesh.geometry.dispose();
        (obj.label.material as THREE.Material).dispose();
        this.bodies.delete(b);
      }
    }
    for (const b of bodies) {
      if (!this.bodies.has(b)) {
        const geom = new THREE.SphereGeometry(b.data.radius, 16, 16);
        const mat = new THREE.MeshStandardMaterial({ color: b.data.color });
        const mesh = new THREE.Mesh(geom, mat);
        const label = this.createLabel(b.data.label);
        this.scene.add(mesh);
        this.scene.add(label);
        this.bodies.set(b, { mesh, label });
      }
    }
  }

  draw(payload: RenderPayload): void {
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w && h && (canvas.width !== w || canvas.height !== h)) {
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
    this.syncBodies(payload.bodies);
    for (const b of payload.bodies) {
      const obj = this.bodies.get(b)!;
      const pos = b.body.getPosition();
      obj.mesh.position.set(pos.x, pos.y, 0);
      obj.label.position.set(pos.x + b.data.radius + 2, pos.y - 2, 0);
      (obj.mesh.material as THREE.MeshStandardMaterial).color.set(b.data.color);
    }
    this.overlay.draw(payload);
    this.renderer.render(this.scene, this.camera);
  }
}
