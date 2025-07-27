import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import SimulationComponent from './Simulation';

const baseSim = {
  onRender: () => () => {},
  start: () => {},
  stop: () => {},
  loadScenario: () => {},
  speed: 1,
  time: 0,
  bodies: [],
  view: { zoom: 1, center: { x: 0, y: 0 }, rotation: 0 },
  findBody: () => null,
  setOverlay: () => {},
  setCanvas: () => {},
  addBody: () => ({ body: {}, data: {} }),
  centerOn: () => {},
  reset: () => {},
  resetView: () => {},
  speedUp: () => {},
  slowDown: () => {},
  resetSpeed: () => {},
} as any;

describe('keyboard and wheel controls', () => {
  it('pans view with arrow keys', async () => {
    const pan = vi.fn();
    const sim = { ...baseSim, pan, zoom: () => {} } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<SimulationComponent sim={sim} />, container);
    await new Promise(r => setTimeout(r, 20));
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(pan).toHaveBeenCalled();
  });

  it('zooms with mouse wheel', async () => {
    const zoom = vi.fn();
    const sim = { ...baseSim, pan: () => {}, zoom } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<SimulationComponent sim={sim} />, container);
    await new Promise(r => setTimeout(r, 20));
    window.dispatchEvent(new window.WheelEvent('wheel', { deltaY: -100, bubbles: true }));
    expect(zoom).toHaveBeenCalled();
  });
});
