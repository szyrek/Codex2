import { describe, it, expect } from 'vitest';
import { Vec3 } from './vector';
import { throwVelocity } from './utils';

describe('throwVelocity', () => {
  it('returns zero vector for small drag', () => {
    const v = throwVelocity(Vec3(0,0,0), Vec3(2,2,0));
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
  });

  it('returns scaled velocity for drag', () => {
    const v = throwVelocity(Vec3(0,0,0), Vec3(20,0,0));
    expect(v.x).toBeGreaterThan(0);
  });
});
