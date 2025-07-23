import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import BodyEditor from './BodyEditor';

const makeBody = (label: string) => ({
  data: { label, mass: 1, radius: 1, color: '#fff' },
  body: {} as any
});

const sim = {
  updateBody: () => {},
  removeBody: () => {}
} as any;

describe('BodyEditor', () => {
  it('updates fields when body prop changes', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BodyEditor sim={sim} body={makeBody('a')} onDeselect={() => {}} />, container);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('a');
    render(null, container);
    render(<BodyEditor sim={sim} body={makeBody('b')} onDeselect={() => {}} />, container);
    await new Promise(r => setTimeout(r));
    const input2 = container.querySelector('input') as HTMLInputElement;
    expect(input2.value).toBe('b');
  });
});
