import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec2 } from 'planck-js';
import { OverlayRenderer } from './renderers/overlayRenderer';

class MockContext {
  strokeStyle = '';
  beginPath() {}
  moveTo(_x:number,_y:number) {}
  lineTo(_x:number,_y:number) {}
  stroke() {}
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
