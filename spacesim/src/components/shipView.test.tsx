import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from 'preact';

vi.mock('./NavigationView', () => ({ default: () => <div>nav</div> }));
vi.mock('./BurnControls', () => ({ default: () => <div>burn</div> }));
vi.mock('./Simulation', () => ({ default: () => <div>sim</div> }));
import ShipView from './ShipView';

beforeAll(() => {
  // stub canvas for Three.js renderer
  HTMLCanvasElement.prototype.getContext = vi.fn();
});

describe('ShipView', () => {
  it('renders four cockpit surfaces', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<ShipView />, container);
    const surfaces = container.querySelectorAll('.ship-surface');
    expect(surfaces.length).toBe(4); // left, window, right, console
    const consoleEl = container.querySelector('.ship-console');
    expect(consoleEl).not.toBeNull();
  });

  it('changes view on pointer move', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<ShipView />, container);
    await Promise.resolve();
    await Promise.resolve();
    const rootEl = container.querySelector('.shipview') as HTMLElement;
    rootEl.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth - 1, bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    expect(rootEl.className).toContain('view-right');
    rootEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    expect(rootEl.className).toContain('view-left');
  });

  it('shows simulation in console screen when view is left', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<ShipView />, container);
    await Promise.resolve();
    const rootEl = container.querySelector('.shipview') as HTMLElement;
    rootEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    const screen = container.querySelector('.console-screen');
    expect(screen?.textContent).toContain('sim');
  });

  it('rotates window when pressing D', async () => {
    vi.useFakeTimers();
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<ShipView />, container);
    await Promise.resolve();
    const img = container.querySelector('.window-image') as HTMLElement;
    const initial = img.style.transform;
    window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'd', bubbles: true }));
    vi.advanceTimersByTime(20);
    window.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'd', bubbles: true }));
    vi.advanceTimersByTime(40);
    await Promise.resolve();
    expect(img.style.transform).not.toBe(initial);
    vi.useRealTimers();
  });
});
