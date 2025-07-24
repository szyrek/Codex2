import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import CanvasView from './CanvasView';
import { Vec3 } from '../vector';

describe('CanvasView', () => {
  it('reports click coordinates relative to canvas', () => {
    const click = vi.fn();
    const sim = { setCanvas: vi.fn(), screenToWorld: (v: Vec3) => v } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<CanvasView sim={sim} onClick={click} />, container);
    const canvas = container.querySelector('canvas')!;
    canvas.getBoundingClientRect = () => ({ left: 10, top: 20, width:100, height:100 } as any);
    canvas.dispatchEvent(new MouseEvent('click', { clientX:15, clientY:25 }));
    const pos = click.mock.calls[0][0] as ReturnType<typeof Vec3>;
    expect(pos.x).toBeCloseTo(5);
    expect(pos.y).toBeCloseTo(5);
  });

  it('scales coordinates with devicePixelRatio', () => {
    const click = vi.fn();
    const screenToWorld = vi.fn((v: Vec3) => v);
    const sim = { setCanvas: vi.fn(), screenToWorld } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const orig = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', { value: 2, configurable: true });
    render(<CanvasView sim={sim} onClick={click} />, container);
    const canvas = container.querySelector('canvas')!;
    Object.defineProperty(canvas, 'clientWidth', { value: 100 });
    Object.defineProperty(canvas, 'clientHeight', { value: 100 });
    canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width:100, height:100 } as any);
    canvas.dispatchEvent(new MouseEvent('click', { clientX:10, clientY:15 }));
    const arg = screenToWorld.mock.calls[0][0] as ReturnType<typeof Vec3>;
    expect(arg.x).toBeCloseTo(20);
    expect(arg.y).toBeCloseTo(30);
    Object.defineProperty(window, 'devicePixelRatio', { value: orig });
  });
});
