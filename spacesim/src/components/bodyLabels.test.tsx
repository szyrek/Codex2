import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import BodyLabels from './BodyLabels';
import { Vec3 } from '../vector';

const body = {
  body: { position: Vec3(5, 6, 0) },
  data: { label: 'b', mass:1, radius:2, color: '#fff' }
};

const sim = {
  bodies: [body],
  worldToScreen: (v: any) => v
} as any;

describe('BodyLabels', () => {
  it('renders label at screen position', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BodyLabels sim={sim} frame={0} />, container);
    const div = container.querySelector('div') as HTMLElement;
    expect(div.textContent).toBe('b');
    expect(div.style.left).toBe(`${5 + 2 + 2}px`);
    expect(div.style.top).toBe(`${6 - 10}px`);
  });

  it('scales position with devicePixelRatio', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const orig = (window as any).devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', { value: 2, configurable: true });
    const sim2 = { bodies: [body], worldToScreen: () => Vec3(10, 12, 0) } as any;
    render(<BodyLabels sim={sim2} frame={0} />, container);
    const div = container.querySelector('div') as HTMLElement;
    expect(div.style.left).toBe(`${10 / 2 + 2 + 2}px`);
    expect(div.style.top).toBe(`${12 / 2 - 10}px`);
    Object.defineProperty(window, 'devicePixelRatio', { value: orig });
  });
});
