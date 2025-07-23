import { describe, it, expect } from 'vitest';
import { Vec2 } from 'planck-js';
import { throwVelocity } from './utils';

describe('throwVelocity', () => {
  it('returns zero vector for small drag', () => {
    const v = throwVelocity(Vec2(0,0), Vec2(2,2), 1);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it('returns scaled velocity for drag', () => {
    const v = throwVelocity(Vec2(0,0), Vec2(20,0), 1);
    expect(v.x).toBeGreaterThan(0);
  });

  it('uses screen distance for weighting', () => {
    const v1 = throwVelocity(Vec2(0,0), Vec2(100,0), 1);
    const v2 = throwVelocity(Vec2(0,0), Vec2(50,0), 2);
    expect(v1.x).toBeCloseTo(v2.x);
  });
});
