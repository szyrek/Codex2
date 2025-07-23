import { bench } from 'vitest';
import { renderBodies } from '../src/renderers/bodyRenderer';
import { Vec2 } from 'planck-js';
import type { BodyData } from '../src/physics/engine';

type MockCtx = CanvasRenderingContext2D & { canvas: { width: number; height: number } };

function mockContext(): MockCtx {
  const noop = () => {};
  return {
    canvas: { width: 800, height: 600 },
    beginPath: noop,
    arc: noop,
    fill: noop,
    fillText: noop,
    clearRect: noop,
    save: noop,
    restore: noop,
    translate: noop,
    scale: noop,
    fillStyle: '#fff',
  } as unknown as MockCtx;
}

function createBodies(count: number) {
  const bodies: { body: { getPosition: () => Vec2 }; data: BodyData }[] = [];
  for (let i = 0; i < count; i++) {
    bodies.push({
      body: { getPosition: () => Vec2(i, 0) } as any,
      data: { mass: 1, radius: 1, color: '#fff', label: String(i) },
    });
  }
  return bodies;
}

const ctx = mockContext();

const small = createBodies(100);
bench('render 100 bodies', () => {
  renderBodies(ctx as any, small);
});

const large = createBodies(1000);
bench('render 1000 bodies', () => {
  renderBodies(ctx as any, large);
});
