import {
  Scene,
  WebGLRenderer,
  OrthographicCamera,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  AmbientLight,
  PointLight,
  Line,
  LineBasicMaterial,
  LineDashedMaterial,
  BufferGeometry,
  Vector3,
  Color,
} from 'three';
import type { Vec3 } from '../vector';
import type { EventBus } from '../core/eventBus';
import { RenderPayload } from './types';
import { predictOrbitType, throwVelocity } from '../utils';
import { simulateOrbit } from '../orbit';
import { G } from '../physics';

export class ThreeRenderer {
  private scene = new Scene();
  private camera: OrthographicCamera;
  private renderer: WebGLRenderer;
  private bodyMeshes = new Map<RenderPayload['bodies'][number]['body'], Mesh>();
  private orbitLines = new Map<RenderPayload['bodies'][number]['body'], Line>();
  private dragLine?: Line;
  private ambient = new AmbientLight(0xffffff, 0.3);
  private sunLight = new PointLight(0xffffff, 1);

  constructor(private canvas: HTMLCanvasElement, bus: EventBus<{ render: RenderPayload }>) {
    this.renderer = new WebGLRenderer({ canvas });
    // keep canvas style dimensions so pointer mapping stays correct
    this.renderer.setSize(canvas.width, canvas.height, false);
    this.camera = new OrthographicCamera(
      canvas.width / -2,
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / -2,
      0.1,
      1000
    );
    this.camera.position.z = 100;
    this.scene.add(this.ambient);
    this.scene.add(this.sunLight);
    bus.on('render', (p) => this.draw(p));
  }

  private syncBodies(bodies: RenderPayload['bodies']) {
    let centralPos: Vec3 | null = null;
    let maxMass = -Infinity;
    for (const { body, data } of bodies) {
      let mesh = this.bodyMeshes.get(body);
      if (!mesh) {
        mesh = new Mesh(
          new SphereGeometry(data.radius, 8, 8),
          new MeshBasicMaterial({ color: data.color })
        );
        this.scene.add(mesh);
        this.bodyMeshes.set(body, mesh);
      }
      const pos = body.position;
      mesh.position.set(pos.x, pos.y, pos.z);
      if (data.mass > maxMass) {
        maxMass = data.mass;
        centralPos = pos;
      }
    }
    for (const [b, mesh] of Array.from(this.bodyMeshes.entries())) {
      if (!bodies.find((obj) => obj.body === b)) {
        this.scene.remove(mesh);
        this.bodyMeshes.delete(b);
      }
    }
    if (centralPos) {
      this.sunLight.position.set(centralPos.x, centralPos.y, 50);
    } else {
      this.sunLight.position.set(0, 0, 50);
    }
  }

  private updateOrbits(bodies: RenderPayload['bodies']) {
    if (!bodies.length) {
      for (const line of this.orbitLines.values()) {
        this.scene.remove(line);
      }
      this.orbitLines.clear();
      return;
    }
    const central = bodies.reduce((a, b) =>
      b.data.mass > a.data.mass ? b : a,
    bodies[0]);
    const cPos = central.body.position;

    const active = new Set(bodies.map((b) => b.body));
    for (const [b, line] of Array.from(this.orbitLines.entries())) {
      if (!active.has(b) || b === central.body) {
        this.scene.remove(line);
        this.orbitLines.delete(b);
      }
    }

    for (const b of bodies) {
      if (b === central) continue;
      const pos = b.body.position;
      const vel = b.body.velocity;
      const type = predictOrbitType(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        G,
      );
      const pts = simulateOrbit(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        type,
      );
      const color =
        type === 'escape' ? 'blue' : type === 'crash' ? 'red' : b.data.color;
      const geom = new BufferGeometry().setFromPoints(
        pts.map((p) => new Vector3(p.x, p.y, 0)),
      );
      const material = new LineDashedMaterial({ color, dashSize: 2, gapSize: 2 });
      let line = this.orbitLines.get(b.body);
      if (!line) {
        line = new Line(geom, material);
        line.computeLineDistances();
        this.scene.add(line);
        this.orbitLines.set(b.body, line);
      } else {
        this.scene.remove(line);
        line.geometry.dispose();
        (line.material as any).dispose?.();
        line.geometry = geom;
        line.material = material;
        line.computeLineDistances();
        this.scene.add(line);
      }
    }
  }

  private updateDragLine(bodies: RenderPayload['bodies'], line?: { start: Vec3; end: Vec3 }) {
    if (!bodies.length) return;
    const central = bodies.reduce((a, b) =>
      b.data.mass > a.data.mass ? b : a,
    bodies[0]);
    const cPos = central.body.position;
    if (!line) {
      if (this.dragLine) {
        this.scene.remove(this.dragLine);
        this.dragLine = undefined;
      }
      return;
    }
    const vel = throwVelocity(line.start, line.end);
    const type = predictOrbitType(line.start, vel, cPos, central.data.mass, central.data.radius, G);
    const color = type === 'escape' ? 'blue' : type === 'crash' ? 'red' : 'green';
    const geom = new BufferGeometry().setFromPoints([
      new Vector3(line.start.x, line.start.y, 0),
      new Vector3(line.end.x, line.end.y, 0),
    ]);
    if (!this.dragLine) {
      this.dragLine = new Line(geom, new LineBasicMaterial({ color }));
      this.scene.add(this.dragLine);
    } else {
      this.dragLine.geometry.dispose();
      (this.dragLine.material as LineBasicMaterial).color = new Color(color);
      this.dragLine.geometry = geom;
    }
  }

  draw({ bodies, view, throwLine }: RenderPayload) {
    this.syncBodies(bodies);
    this.updateOrbits(bodies);
    this.updateDragLine(bodies, throwLine);
    const v = view ?? { center: { x: 0, y: 0 }, zoom: 1, rotation: 0 };
    this.camera.position.x = v.center.x;
    this.camera.position.y = v.center.y;
    this.camera.zoom = v.zoom;
    this.camera.rotation.z = v.rotation;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}
