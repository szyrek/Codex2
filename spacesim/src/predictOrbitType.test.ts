import { describe, it, expect } from 'vitest';
import { Vec3 } from './vector';
import { predictOrbitType, throwVelocity } from './utils';
import { G } from './physics';

const centralPos = Vec3(0,0,0);
const mass = 1;
const radius = 1;

describe('predictOrbitType', () => {
  it('detects escape', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(110,0,0));
    expect(predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G)).toBe('escape');
  });

  it('detects stable orbit', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(10,50,0));
    expect(predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G)).toBe('stable');
  });

  it('detects crash', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(0,0,0));
    expect(predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G)).toBe('crash');
  });
});
