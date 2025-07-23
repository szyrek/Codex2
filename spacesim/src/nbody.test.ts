import { describe, it, expect } from 'vitest';
import { updatePhysics, Body } from './nbody';

function makeBody(id: string, x: number, y: number, mass: number): Body {
  return { id, x, y, vx: 0, vy: 0, ax: 0, ay: 0, mass };
}

describe('updatePhysics', () => {
  it('attracts bodies toward each other', () => {
    const a = makeBody('a', 0, 0, 1);
    const b = makeBody('b', 10, 0, 1);
    updatePhysics([a, b], 1 / 60);
    expect(a.vx).toBeGreaterThan(0);
    expect(b.vx).toBeLessThan(0);
  });

  it('integrates positions over time', () => {
    const a = makeBody('a', 0, 0, 1);
    const b = makeBody('b', 1, 0, 1);
    for (let i = 0; i < 100; i++) {
      updatePhysics([a, b], 1 / 60);
    }
    expect(a.x).toBeGreaterThan(0);
    expect(b.x).toBeLessThan(1);
  });
});
