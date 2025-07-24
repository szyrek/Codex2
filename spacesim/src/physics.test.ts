import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec2 } from 'planck-js';

describe('Sandbox gravity', () => {
  it('attracts bodies toward each other', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.addBody(Vec2(10, 0), Vec2(), { mass: 1, radius: 1, color: 'blue', label: '' });

    sb.step(1 / 60);
    const [a, b] = sb.bodies;
    expect(a.body.getLinearVelocity().x).toBeGreaterThan(0);
    expect(b.body.getLinearVelocity().x).toBeLessThan(0);
  });

  it('accelerates equal masses the same regardless of radius', () => {
    const sb = new PhysicsEngine();
    const a = sb.addBody(Vec2(-5, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    const b = sb.addBody(Vec2(5, 0), Vec2(), { mass: 1, radius: 2, color: 'blue', label: '' });
    sb.step(1);
    const velA = a.body.getLinearVelocity().x;
    const velB = b.body.getLinearVelocity().x;
    expect(Math.abs(velA)).toBeCloseTo(Math.abs(velB));
  });

  it('clears bodies on reset', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.reset();
    expect(sb.bodies.length).toBe(0);
  });

  it('updates body mass', () => {
    const sb = new PhysicsEngine();
    const start = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    const fixture = start?.body.getFixtureList();
    expect(fixture?.getDensity()).toBeCloseTo(1 / Math.PI);
    if (start) sb.updateBody(start, { mass: 2 });
    const updated = start.body.getFixtureList();
    expect(updated?.getDensity()).toBeCloseTo(2 / Math.PI);
    const expected = 2 / (Math.PI * 1 * 1);
    expect(fixture?.getDensity()).toBeCloseTo(expected);
  });

  it('updates body radius', () => {
    const sb = new PhysicsEngine();
    const start = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    if (start) sb.updateBody(start, { radius: 2 });
    const fixture = start?.body.getFixtureList();
    const shape = fixture?.getShape() as any;
    expect(shape.m_radius).toBe(2);
    expect(fixture?.getDensity()).toBeCloseTo(1 / (Math.PI * 4));
    const expected = 1 / (Math.PI * 2 * 2);
    expect(fixture?.getDensity()).toBeCloseTo(expected);
  });

  it('finds a body by position', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec2(5, 5), Vec2(), { mass: 1, radius: 2, color: 'red', label: '' });
    const found = sb.findBody(Vec2(6, 5));
    expect(found).toBeDefined();
  });

  it('returns undefined when no body at position', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec2(5, 5), Vec2(), { mass: 1, radius: 2, color: 'red', label: '' });
    const found = sb.findBody(Vec2(50, 50));
    expect(found).toBeUndefined();
  });

  it('merges smaller body on collision with massive one', () => {
    const sb = new PhysicsEngine();
    const big = sb.addBody(Vec2(0, 0), Vec2(), { mass: 3, radius: 1, color: 'red', label: '' });
    const small = sb.addBody(Vec2(0.5, 0), Vec2(), { mass: 1, radius: 1, color: 'blue', label: '' });
    sb.step(0);
    expect(sb.bodies.length).toBe(1);
    expect(sb.bodies[0].data.mass).toBeCloseTo(4);
  });

  it('bounces similar masses', () => {
    const sb = new PhysicsEngine();
    const a = sb.addBody(Vec2(-0.5, 0), Vec2(1, 0), { mass: 1, radius: 1, color: 'red', label: '' });
    const b = sb.addBody(Vec2(0.5, 0), Vec2(-1, 0), { mass: 1, radius: 1, color: 'blue', label: '' });
    sb.step(0);
    expect(a.body.getLinearVelocity().x).toBeLessThan(0);
    expect(b.body.getLinearVelocity().x).toBeGreaterThan(0);
  });

  it('removes bodies correctly', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.removeBody(body);
    expect(sb.bodies.length).toBe(0);
  });

  it('updates label and color', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { label: 'b', color: 'blue' });
    expect(body.data.label).toBe('b');
    expect(body.data.color).toBe('blue');
  });

  it('updates body position', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { position: Vec2(5, 6) });
    const pos = body.body.getPosition();
    expect(pos.x).toBeCloseTo(5);
    expect(pos.y).toBeCloseTo(6);
  });

  it('updates body velocity', () => {
    const sb = new PhysicsEngine();
    const body = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: 'a' });
    sb.updateBody(body, { velocity: Vec2(3, 4) });
    const vel = body.body.getLinearVelocity();
    expect(vel.x).toBeCloseTo(3);
    expect(vel.y).toBeCloseTo(4);
  });
});
