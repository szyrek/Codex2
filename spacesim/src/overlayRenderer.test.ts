import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec2 } from 'planck-js';
import { OverlayRenderer } from './renderers/overlayRenderer';
import { throwVelocity } from './utils';
import * as THREE from 'three';

class MockScene {
  lines: THREE.Line[] = [];
  add(obj: THREE.Object3D) {
    if (obj instanceof THREE.Line) this.lines.push(obj);
  }
  remove() {}
}

describe('OverlayRenderer color', () => {
  it('uses blue for escape velocity', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(110,0) } });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('blue').getHex());
  });

  it('uses green for stable orbit', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(10,50) } });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('green').getHex());
  });

  it('uses red for crash course', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(0,0) } });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('red').getHex());
  });
});

describe('OverlayRenderer orbits', () => {
  it('draws orbit in body color for stable trajectory', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const orbitVel = throwVelocity(Vec2(10,0), Vec2(10,50));
    engine.addBody(Vec2(10,0), orbitVel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('white').getHex());
  });

  it('colors escape trajectory blue', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(110,0));
    engine.addBody(Vec2(10,0), vel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('blue').getHex());
  });

  it('colors crash trajectory red', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(0,0));
    engine.addBody(Vec2(10,0), vel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const scene = new MockScene() as unknown as THREE.Scene;
    const overlay = new OverlayRenderer(scene);
    overlay.draw({ bodies: engine.bodies });
    expect(scene.lines[0].material.color.getHex()).toBe(new THREE.Color('red').getHex());
  });
});
