import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import Root from './Root';
import * as hooks from 'preact/hooks';

vi.mock('../simulation', () => ({
  Simulation: class {
    speed = 1;
    time = 0;
    bodies = [];
    view = { zoom: 1, center: { x: 0, y: 0 } };
    onRender() { return () => {}; }
    start() {}
    stop() {}
    loadScenario() {}
    setCanvas() {}
    findBody() { return null; }
    setOverlay() {}
    addBody() { return { body: {}, data: {} } as any; }
    pan() {}
    zoom() {}
    centerOn() {}
    reset() {}
    resetView() {}
    speedUp() {}
    slowDown() {}
    resetSpeed() {}
    worldToScreen(p: any) { return p; }
    screenToWorld(p: any) { return p; }
  }
}));

describe('Root', () => {
  it('renders logo image', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<Root />, container);
    const img = container.querySelector('header img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('alt')).toBe('Spacesim logo');
  });

  it('contains Shipview tab button', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<Root />, container);
    const btn = Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Shipview');
    expect(btn).not.toBeUndefined();
  });
});
