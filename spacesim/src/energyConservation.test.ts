import { describe, it, expect } from 'vitest';
import { PhysicsEngine, G } from './physics';
import { Vec2 } from './vec';

function systemEnergy(a: { body: any; data: any }, b: { body: any; data: any }) {
  const posA = a.body.position;
  const posB = b.body.position;
  const velA = a.body.velocity;
  const velB = b.body.velocity;
  const r = posA.clone().sub(posB).length();
  const keA = 0.5 * a.data.mass * velA.lengthSquared();
  const keB = 0.5 * b.data.mass * velB.lengthSquared();
  const pe = -(G * a.data.mass * b.data.mass) / r;
  return keA + keB + pe;
}

describe('energy conservation', () => {
  it('keeps total energy roughly constant', () => {
    const engine = new PhysicsEngine(5);
    const sun = engine.addBody(Vec2(0, 0), Vec2(), { mass: 1000, radius: 10, color: 'yellow', label: 'Sun' });
    const earth = engine.addBody(Vec2(100, 0), Vec2(0, 3), { mass: 1, radius: 4, color: 'blue', label: 'Earth' });
    const initial = systemEnergy(earth, sun);
    for (let i = 0; i < 100; i++) engine.step(0.04);
    const final = systemEnergy(earth, sun);
    expect(final).toBeCloseTo(initial, 0);
  });
});
