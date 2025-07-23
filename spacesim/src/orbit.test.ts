import { describe, it, expect } from 'vitest';
import { PhysicsEngine, G } from './physics';
import { Vec2 } from './vec';
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
  const centralPos = Vec2(0,0);
  const mass = 1;
  const radius = 1;

  it('returns closed path for stable orbit', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(10,50));
    const type = predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec2(10,0), vel, centralPos, mass, radius, type);
    const first = pts[0];
    const last = pts[pts.length-1];
    expect(pts.length).toBeGreaterThan(300);
    expect(Vec2.distance(first, last)).toBeLessThan(0.5);
  });

  it('stops when crashing', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(0,0));
    const type = predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec2(10,0), vel, centralPos, mass, radius, type);
    const last = pts[pts.length-1];
    expect(Vec2.distance(last, centralPos)).toBeLessThanOrEqual(radius);
  });

  it('stops after leaving sphere of influence', () => {
    const vel = throwVelocity(Vec2(10,0), Vec2(110,0));
    const type = predictOrbitType(Vec2(10,0), vel, centralPos, mass, radius, G);
    const pts = simulateOrbit(Vec2(10,0), vel, centralPos, mass, radius, type);
    const last = pts[pts.length-1];
    expect(Vec2.distance(last, centralPos)).toBeGreaterThanOrEqual(ESCAPE_RADIUS);
  });
});
