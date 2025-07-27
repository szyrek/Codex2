import { describe, it, expect } from 'vitest';
import { Vec3 } from './vector';
import { calcOrbitalParams } from './orbitalParams';

// central body at origin with mass 1 and radius 1
const parentPos = Vec3(0,0,0);
const parentMass = 1;
const parentRadius = 1;

describe('calcOrbitalParams', () => {
  it('computes circular orbit parameters', () => {
    const pos = Vec3(10,0,0);
    const mu = 1; // G * mass = 1 since G=1 and mass=1
    const v = Math.sqrt(mu / pos.length());
    const params = calcOrbitalParams(pos, Vec3(0,v,0), parentPos, parentMass, parentRadius);
    expect(params.height).toBeCloseTo(9);
    expect(params.speed).toBeCloseTo(v);
    expect(params.apoapsis).toBeCloseTo(9);
    expect(params.periapsis).toBeCloseTo(9);
    expect(params.inclination).toBeCloseTo(0);
  });
});
