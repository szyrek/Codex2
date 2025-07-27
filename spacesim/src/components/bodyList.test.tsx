import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import BodyList from './BodyList';

const makeBody = (label: string) => ({
  data: { label, mass: 1, radius: 1, color: '#fff' },
  body: {} as any
});

describe('BodyList', () => {
  it('highlights selected body', () => {
    const bodies = [makeBody('a'), makeBody('b')];
    const sim = { bodies } as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BodyList sim={sim} selected={bodies[1]} onSelect={() => {}} />, container);
    const items = container.querySelectorAll('li');
    expect((items[1] as HTMLElement).style.background).not.toBe('transparent');
    expect((items[0] as HTMLElement).style.background).toBe('transparent');
  });
});
