import { describe, it, expect } from 'vitest';
import { toRenderSpace, toSimSpace, METERS_PER_PIXEL } from './spaceTransform';

describe('spaceTransform', () => {
  it('round trips between sim and render space', () => {
    const height = 200;
    const sim = { x: 10, y: 20 };
    const render = toRenderSpace(sim, height);
    const round = toSimSpace(render, height);
    expect(round.x).toBeCloseTo(sim.x);
    expect(round.y).toBeCloseTo(sim.y);
  });
});
