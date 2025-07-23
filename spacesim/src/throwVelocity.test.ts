import { describe, it, expect } from 'vitest';
import { Vec2 } from 'planck-js';
import { throwVelocity } from './utils';

describe('throwVelocity', () => {
  it('returns zero vector for small drag', () => {
    const v = throwVelocity(Vec2(0,0), Vec2(2,2));
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it('returns scaled velocity for drag', () => {
    const v = throwVelocity(Vec2(0,0), Vec2(20,0));
    expect(v.x).toBeGreaterThan(0);
  });
});
