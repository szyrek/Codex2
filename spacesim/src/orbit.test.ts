import { describe, it, expect } from 'vitest';
import { PhysicsEngine, G } from './physics';
import { Vec3, distance } from './vector';
import { simulateOrbit, ESCAPE_RADIUS } from './orbit';
import { throwVelocity, predictOrbitType } from './utils';

class MockContext {
  strokeStyle = '';
  strokes: string[] = [];
  beginPath() {}
  moveTo(_x:number,_y:number) {}
  lineTo(_x:number,_y:number) {}
  setLineDash(_d:number[]) {}
  stroke() { this.strokes.push(this.strokeStyle); }
}


describe('simulateOrbit', () => {
  const centralPos = Vec3(0,0,0);
  const mass = 1;
  const radius = 1;

  it('returns closed path for stable orbit', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(10,50,0));
    const type = predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec3(10,0,0), vel, centralPos, mass, radius, type);
    const first = pts[0];
    const last = pts[pts.length-1];
    expect(pts.length).toBeGreaterThan(300);
    expect(distance(first, last)).toBeLessThan(0.5);
  });

  it('stops when crashing', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(0,0,0));
    const type = predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec3(10,0,0), vel, centralPos, mass, radius, type);
    const last = pts[pts.length-1];
    expect(distance(last, centralPos)).toBeLessThanOrEqual(radius);
  });

  it('stops after leaving sphere of influence', () => {
    const vel = throwVelocity(Vec3(10,0,0), Vec3(110,0,0));
    const type = predictOrbitType(Vec3(10,0,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec3(10,0,0), vel, centralPos, mass, radius, type);
    const last = pts[pts.length-1];
    expect(distance(last, centralPos)).toBeGreaterThanOrEqual(ESCAPE_RADIUS);
  });
});
