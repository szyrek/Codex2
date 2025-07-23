import { describe, it, expect } from 'vitest';
import { Vec2 } from './vec';
import { predictOrbitType, throwVelocity } from './utils';
import { G } from './physics';

const centralPos = Vec2(0,0);
const mass = 1;
const radius = 1;

describe('predictOrbitType', () => {
  it('detects escape', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(110,0));
    expect(predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G)).toBe('escape');
  });

  it('detects stable orbit', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(10,50));
    expect(predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G)).toBe('stable');
  });

  it('detects crash', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(0,0));
    expect(predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G)).toBe('crash');
  });
});
