import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec3 } from './vector';

describe('Sandbox gravity', () => {
  it('attracts bodies toward each other', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.addBody(Vec3(10, 0), Vec3(), { mass: 1, radius: 1, color: 'blue', label: '' });

    sb.step(1 / 60);
    const [a, b] = sb.bodies;
    expect(a.body.velocity.x).toBeGreaterThan(0);
    expect(b.body.velocity.x).toBeLessThan(0);
  });

  it('accelerates equal masses the same regardless of radius', () => {
    const sb = new PhysicsEngine();
    const a = sb.addBody(Vec3(-5, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: '' });
    const b = sb.addBody(Vec3(5, 0), Vec3(), { mass: 1, radius: 2, color: 'blue', label: '' });
    sb.step(1);
    const velA = a.body.velocity.x;
    const velB = b.body.velocity.x;
    expect(Math.abs(velA)).toBeCloseTo(Math.abs(velB));
  });

  it('clears bodies on reset', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.reset();
    expect(sb.bodies.length).toBe(0);
  });

  it('updates body mass', () => {
    const sb = new PhysicsEngine();
    const start = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.updateBody(start, { mass: 2 });
    expect(start.data.mass).toBeCloseTo(2);
  });

  it('updates body radius', () => {
    const sb = new PhysicsEngine();
    const start = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: '' });
    if (start) sb.updateBody(start, { radius: 2 });
    sb.updateBody(start, { radius: 2 });
    expect(start.data.radius).toBeCloseTo(2);
  });

  it('finds a body by position', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec3(5, 5), Vec3(), { mass: 1, radius: 2, color: 'red', label: '' });
    const found = sb.findBody(Vec3(6, 5));
    expect(found).toBeDefined();
  });

  it('returns undefined when no body at position', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec3(5, 5), Vec3(), { mass: 1, radius: 2, color: 'red', label: '' });
    const found = sb.findBody(Vec3(50, 50));
    expect(found).toBeUndefined();
  });

  it('merges smaller body on collision with massive one', () => {
    const sb = new PhysicsEngine();
    const big = sb.addBody(Vec3(0, 0), Vec3(), { mass: 3, radius: 1, color: 'red', label: '' });
    const small = sb.addBody(Vec3(0.5, 0), Vec3(), { mass: 1, radius: 1, color: 'blue', label: '' });
    sb.step(0);
    expect(sb.bodies.length).toBe(1);
    expect(sb.bodies[0].data.mass).toBeCloseTo(4);
  });

  it('bounces similar masses', () => {
    const sb = new PhysicsEngine();
    const a = sb.addBody(Vec3(-0.5, 0), Vec3(1, 0), { mass: 1, radius: 1, color: 'red', label: '' });
    const b = sb.addBody(Vec3(0.5, 0), Vec3(-1, 0), { mass: 1, radius: 1, color: 'blue', label: '' });
    sb.step(0);
    expect(a.body.velocity.x).toBeLessThan(0);
    expect(b.body.velocity.x).toBeGreaterThan(0);
  });

  it('removes bodies correctly', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.removeBody(body);
    expect(sb.bodies.length).toBe(0);
  });

  it('updates label and color', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { label: 'b', color: 'blue' });
    expect(body.data.label).toBe('b');
    expect(body.data.color).toBe('blue');
  });

  it('updates body position', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { position: Vec3(5, 6) });
    const pos = body.body.position;
    expect(pos.x).toBeCloseTo(5);
    expect(pos.y).toBeCloseTo(6);
  });

  it('updates body velocity', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec3(0, 0), Vec3(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { velocity: Vec3(3, 4) });
    const vel = body.body.velocity;
    expect(vel.x).toBeCloseTo(3);
    expect(vel.y).toBeCloseTo(4);
  });

  it('accelerates equally regardless of radius', () => {
    const sb = new PhysicsEngine();
    const a = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    const b = sb.addBody(Vec2(10, 0), Vec2(), { mass: 1, radius: 3, color: 'blue', label: '' });
    sb.step(1 / 60);
    const va = a.body.getLinearVelocity().x;
    const vb = b.body.getLinearVelocity().x;
    expect(va).toBeCloseTo(-vb, 5);
  });
});
