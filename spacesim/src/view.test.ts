import { describe, it, expect } from 'vitest';
import { Simulation } from './simulation';
import { Vec3 } from './vector';

function setupSim() {
  const sim = new Simulation();
  const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
  (sim as any).canvas = canvas;
  return sim;
}

describe('view transforms', () => {
  it('converts between world and screen coordinates', () => {
    const sim = setupSim();
    sim.setZoom(2);
    sim.pan(10, 10);
    const world = Vec3(10, 10, 0);
    const screen = sim.worldToScreen(world);
    expect(screen.x).toBeCloseTo(100);
    expect(screen.y).toBeCloseTo(100);
    const round = sim.screenToWorld(screen);
    expect(round.x).toBeCloseTo(world.x);
    expect(round.y).toBeCloseTo(world.y);
  });

  it('maps positive world y upward on screen', () => {
    const sim = setupSim();
    const screen = sim.worldToScreen(Vec3(0, 10, 0));
    expect(screen.y).toBeLessThan(100);
    const round = sim.screenToWorld(screen);
    expect(round.y).toBeCloseTo(10);
  });

  it('centers on body and resets zoom', () => {
    const sim = setupSim();
    const body = sim.addBody(Vec3(5, 5, 0), Vec3(), { mass:1, radius:1, color:'#fff', label:'b' });
    sim.setZoom(3);
    sim.pan(20, 20);
    sim.centerOn(body);
    expect(sim.view.zoom).toBe(1);
    expect(sim.view.center.x).toBeCloseTo(5);
    expect(sim.view.center.y).toBeCloseTo(5);
  });

  it('applies rotation to coordinate transforms', () => {
    const sim = setupSim();
    sim.rotate(Math.PI / 2);
    const world = Vec3(10, 0, 0);
    const screen = sim.worldToScreen(world);
    const round = sim.screenToWorld(screen);
    expect(round.x).toBeCloseTo(world.x);
    expect(round.y).toBeCloseTo(world.y);
  });
});
