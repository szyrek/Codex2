import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';

vi.mock('./NavigationView', () => ({ default: () => <div>nav</div> }));
vi.mock('./BurnControls', () => ({ default: () => <div>burn</div> }));
import ShipView from './ShipView';

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
    const rootEl = container.querySelector('.shipview') as HTMLElement;
    rootEl.dispatchEvent(new MouseEvent('mousemove', { clientX: window.innerWidth - 1, bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    expect(rootEl.className).toContain('view-right');
    rootEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    expect(rootEl.className).toContain('view-left');
  });
});
