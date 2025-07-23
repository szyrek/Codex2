import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import CanvasView from './CanvasView';
import { Vec2 } from 'planck-js';

describe('CanvasView', () => {
  it('reports click coordinates relative to canvas', () => {
    const click = vi.fn();
    const sim = { setCanvas: vi.fn(), screenToWorld: (v: Vec2) => v } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<CanvasView sim={sim} onClick={click} />, container);
    const canvas = container.querySelector('canvas')!;
    canvas.getBoundingClientRect = () => ({ left: 10, top: 20, width:100, height:100 } as any);
    canvas.dispatchEvent(new MouseEvent('click', { clientX:15, clientY:25 }));
    const pos = click.mock.calls[0][0] as ReturnType<typeof Vec2>;
    expect(pos.x).toBeCloseTo(5);
    expect(pos.y).toBeCloseTo(5);
  });
});
