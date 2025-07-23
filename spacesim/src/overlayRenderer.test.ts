import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec2 } from 'planck-js';
import { OverlayRenderer } from './renderers/overlayRenderer';
import { throwVelocity } from './utils';

class MockContext {
  strokeStyle = '';
  strokes: string[] = [];
  beginPath() {}
  moveTo(_x:number,_y:number) {}
  lineTo(_x:number,_y:number) {}
  setLineDash(_d:number[]) {}
  stroke() { this.strokes.push(this.strokeStyle); }
}

describe('OverlayRenderer color', () => {
  it('uses blue for escape velocity', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(110,0) } });
    expect(ctx.strokeStyle).toBe('blue');
  });

  it('uses green for stable orbit', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(10,50) } });
    expect(ctx.strokeStyle).toBe('green');
  });

  it('uses red for crash course', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(0,0) } });
    expect(ctx.strokeStyle).toBe('red');
  });
});

describe('OverlayRenderer orbits', () => {
  it('draws orbit in body color for stable trajectory', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const orbitVel = throwVelocity(Vec2(10,0), Vec2(10,50));
    engine.addBody(Vec2(10,0), orbitVel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies });
    expect(ctx.strokes[0]).toBe('white');
  });

  it('colors escape trajectory blue', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(110,0));
    engine.addBody(Vec2(10,0), vel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies });
    expect(ctx.strokes[0]).toBe('blue');
  });

  it('colors crash trajectory red', () => {
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(0,0));
    engine.addBody(Vec2(10,0), vel, { mass: 1, radius: 1, color: 'white', label: 'b' });
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    const overlay = new OverlayRenderer(ctx);
    overlay.draw({ bodies: engine.bodies });
    expect(ctx.strokes[0]).toBe('red');
  });
});
