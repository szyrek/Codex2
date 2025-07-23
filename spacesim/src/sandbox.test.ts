import { describe, it, expect } from 'vitest';
import { Sandbox } from './sandbox';
import { Vec2 } from 'planck-js';

describe('Sandbox gravity', () => {
  it('attracts bodies toward each other', () => {
    const sb = new Sandbox();
    sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.addBody(Vec2(10, 0), Vec2(), { mass: 1, radius: 1, color: 'blue', label: '' });

    sb.step(1 / 60);
    const [a, b] = sb.bodies;
    expect(a.body.getLinearVelocity().x).toBeGreaterThan(0);
    expect(b.body.getLinearVelocity().x).toBeLessThan(0);
  });

  it('clears bodies on reset', () => {
    const sb = new Sandbox();
    sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    sb.reset();
    expect(sb.bodies.length).toBe(0);
  });

  it('updates body mass', () => {
    const sb = new Sandbox();
    const start = sb.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'red', label: '' });
    if (start) sb.updateBody(start, { mass: 2 });
    const fixture = start?.body.getFixtureList();
    expect(fixture?.getDensity()).toBe(2);
  });

  it('finds a body by position', () => {
    const sb = new Sandbox();
    sb.addBody(Vec2(5, 5), Vec2(), { mass: 1, radius: 2, color: 'red', label: '' });
    const found = sb.findBody(Vec2(6, 5));
    expect(found).toBeDefined();
  });
});
