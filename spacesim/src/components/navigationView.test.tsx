import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import NavigationView from './NavigationView';
import { Vec2 } from 'planck-js';

describe('NavigationView', () => {
  it('renders a canvas', () => {
    const sim = { start: vi.fn(), stop: vi.fn(), rotate: vi.fn(), setCanvas: vi.fn(), screenToWorld: (v: Vec2) => v } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<NavigationView sim={sim} />, container);
    expect(container.querySelector('canvas')).not.toBeNull();
  });
});
