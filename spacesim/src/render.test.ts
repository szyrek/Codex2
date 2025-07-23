import { describe, it, expect } from 'vitest';
import { PhysicsEngine } from './physics';
import { Vec2 } from 'planck-js';
import { renderBodies } from './renderers/bodyRenderer';

class MockContext {
  public arcs: {x:number;y:number;r:number}[] = [];
  fillStyle = '';
  beginPath() {}
  arc(x:number, y:number, r:number) { this.arcs.push({x,y,r}); }
  fill() {}
  fillText(_text:string,_x:number,_y:number) {}
}

describe('renderBodies', () => {
  it('draws bodies at current positions', () => {
    const sb = new PhysicsEngine();
    sb.addBody(Vec2(0, 0), Vec2(), { mass: 1000, radius: 10, color: 'yellow', label: 'sun' });
    const planet = sb.addBody(Vec2(100, 0), Vec2(0, 10), { mass: 1, radius: 2, color: 'blue', label: 'p' });
    for (let i = 0; i < 60; i++) sb.step(1/60);
    const ctx = new MockContext() as unknown as CanvasRenderingContext2D;
    renderBodies(ctx, sb.bodies);
    expect(ctx.arcs.length).toBe(2);
    const drawnPlanet = ctx.arcs[1];
    const pos = planet.body.getPosition();
    expect(drawnPlanet.x).toBeCloseTo(pos.x, 1);
    expect(drawnPlanet.y).toBeCloseTo(pos.y, 1);
  });
});
