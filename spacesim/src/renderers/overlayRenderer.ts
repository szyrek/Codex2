import * as THREE from 'three';
import { RenderPayload } from './types';
import { throwVelocity, predictOrbitType, type OrbitType } from '../utils';
import { G } from '../physics';
import { Vec2 } from 'planck-js';

export const ESCAPE_RADIUS = 100;

export function simulateOrbit(
  pos: Vec2,
  vel: Vec2,
  central: Vec2,
  mass: number,
  radius: number,
  type: OrbitType,
  dt = 0.1,
  steps = 360
) {
  const pts: THREE.Vector3[] = [];
  const mu = G * mass;
  const startR = pos.clone().sub(central);
  const r0 = startR.length();

  if (type === 'stable') {
    const v2 = vel.lengthSquared();
    const energy = 0.5 * v2 - mu / r0;
    const h = startR.x * vel.y - startR.y * vel.x;
    const a = -mu / (2 * energy);
    const e = Math.sqrt(Math.max(0, 1 + (2 * energy * h * h) / (mu * mu)));
    const eVec = Vec2(vel.y * h / mu - startR.x / r0, -vel.x * h / mu - startR.y / r0);
    const phi = Math.atan2(eVec.y, eVec.x);
    const f0 = Math.atan2(startR.y, startR.x) - phi;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    for (let i = 0; i <= steps; i++) {
      const f = f0 + (i * 2 * Math.PI) / steps;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(f));
      const x = r * Math.cos(f);
      const y = r * Math.sin(f);
      const px = cosPhi * x - sinPhi * y;
      const py = sinPhi * x + cosPhi * y;
      pts.push(new THREE.Vector3(px + central.x, py + central.y, 0));
    }
    return pts;
  }

  let p = pos.clone();
  let v = vel.clone();
  for (let i = 0; i < 5000; i++) {
    const rVec = p.clone().sub(central);
    const dist = rVec.length();
    if (type === 'crash' && dist <= radius) break;
    if (type === 'escape' && dist >= ESCAPE_RADIUS) break;
    const acc = rVec.clone().mul((-mu) / Math.pow(dist, 3));
    v = v.clone().add(acc.mul(dt));
    p = p.clone().add(v.clone().mul(dt));
    pts.push(new THREE.Vector3(p.x, p.y, 0));
  }
  return pts;
}

export class OverlayRenderer {
  constructor(private scene: THREE.Scene) {}

  private lines: THREE.Line[] = [];

  private clear() {
    for (const l of this.lines) {
      this.scene.remove(l);
      (l.material as THREE.Material).dispose();
      l.geometry.dispose();
    }
    this.lines = [];
  }

  draw({ throwLine, bodies }: RenderPayload): void {
    this.clear();
    if (!bodies.length) return;
    const central = bodies.reduce((a, b) =>
      b.data.mass > a.data.mass ? b : a,
    bodies[0]);
    const cPos = central.body.getPosition();
    for (const b of bodies) {
      if (b === central) continue;
      const pos = b.body.getPosition();
      const vel = b.body.getLinearVelocity();
      const type = predictOrbitType(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        G
      );
      const color =
        type === 'escape' ? 'blue' : type === 'crash' ? 'red' : b.data.color;
      const pts = simulateOrbit(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        type
      );
      if (pts.length) {
        const geom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(pos.x, pos.y, 0),
          ...pts,
        ]);
        const mat = new THREE.LineBasicMaterial({ color });
        const line = new THREE.Line(geom, mat);
        this.scene.add(line);
        this.lines.push(line);
      }
    }

    if (throwLine) {
      const vel = throwVelocity(throwLine.start, throwLine.end);
      const type = predictOrbitType(
        throwLine.start,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        G
      );
      const color =
        type === 'escape' ? 'blue' : type === 'crash' ? 'red' : 'green';
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(throwLine.start.x, throwLine.start.y, 1),
        new THREE.Vector3(throwLine.end.x, throwLine.end.y, 1),
      ]);
      const mat = new THREE.LineBasicMaterial({ color });
      const line = new THREE.Line(geom, mat);
      this.scene.add(line);
      this.lines.push(line);
    }
  }
}
