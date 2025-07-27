import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import NavigationView from './NavigationView';
import { Vec3 } from '../vector';

describe('NavigationView', () => {
  it('renders a canvas', () => {
    const sim = { start: vi.fn(), stop: vi.fn(), rotate: vi.fn(), setCanvas: vi.fn(), screenToWorld: (v: Vec3) => v, pan: vi.fn(), view: { zoom: 1 } } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<NavigationView sim={sim} />, container);
    expect(container.querySelector('canvas')).not.toBeNull();
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    (buttons[0] as HTMLButtonElement).click();
    expect(sim.pan).toHaveBeenCalled();
  });
});
