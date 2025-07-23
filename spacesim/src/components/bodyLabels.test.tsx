import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import BodyLabels from './BodyLabels';
import { Vec2 } from 'planck-js';

const body = {
  body: { getPosition: () => Vec2(5, 6) },
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
});
