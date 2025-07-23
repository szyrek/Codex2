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

  it('scales coordinates with devicePixelRatio', () => {
    const click = vi.fn();
    const screenToWorld = vi.fn((v: Vec2) => v);
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
    const arg = screenToWorld.mock.calls[0][0] as ReturnType<typeof Vec2>;
    expect(arg.x).toBeCloseTo(20);
    expect(arg.y).toBeCloseTo(30);
    Object.defineProperty(window, 'devicePixelRatio', { value: orig });
  });

  it('calls optional mouse handlers with world coordinates', () => {
    const down = vi.fn();
    const move = vi.fn();
    const up = vi.fn();
    const sim = { setCanvas: vi.fn(), screenToWorld: (v: Vec2) => v } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />,
      container
    );
    const canvas = container.querySelector('canvas')!;
    canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 } as any);
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: 1, clientY: 2 }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 3, clientY: 4 }));
    canvas.dispatchEvent(new MouseEvent('mouseup', { clientX: 5, clientY: 6 }));
    expect((down.mock.calls[0][0] as ReturnType<typeof Vec2>).x).toBeCloseTo(1);
    expect((down.mock.calls[0][0] as ReturnType<typeof Vec2>).y).toBeCloseTo(2);
    expect((move.mock.calls[0][0] as ReturnType<typeof Vec2>).x).toBeCloseTo(3);
    expect((move.mock.calls[0][0] as ReturnType<typeof Vec2>).y).toBeCloseTo(4);
    expect((up.mock.calls[0][0] as ReturnType<typeof Vec2>).x).toBeCloseTo(5);
    expect((up.mock.calls[0][0] as ReturnType<typeof Vec2>).y).toBeCloseTo(6);
  });
});
