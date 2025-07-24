import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';

vi.mock('./Simulation', () => ({ default: () => <div>sim</div> }));
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
});
