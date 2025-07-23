import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import BodyEditor from './BodyEditor';

const makeBody = (label: string) => ({
  data: { label, mass: 1, radius: 1, color: '#fff' },
  body: { translation: () => ({ x: 0, y: 0 }), linvel: () => ({ x: 0, y: 0 }) } as any
});

const sim = {
  updateBody: () => {},
  removeBody: () => {}
} as any;

describe('BodyEditor', () => {
  it('updates fields when body prop changes', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BodyEditor sim={sim} body={makeBody('a')} onDeselect={() => {}} frame={0} />, container);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('a');
    render(null, container);
    render(<BodyEditor sim={sim} body={makeBody('b')} onDeselect={() => {}} frame={1} />, container);
    await new Promise(r => setTimeout(r));
    const input2 = container.querySelector('input') as HTMLInputElement;
    expect(input2.value).toBe('b');
  });

  it('shows updated position each frame', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const body = makeBody('a');
    render(<BodyEditor sim={sim} body={body} onDeselect={() => {}} frame={0} />, container);
    const labels = Array.from(container.querySelectorAll('label'));
    const posX = labels.find(l => l.textContent?.startsWith('Pos X'))!.querySelector('input') as HTMLInputElement;
    expect(posX.value).toBe('0');
    (body.body as any).translation = () => ({ x: 2, y: 0 });
    render(<BodyEditor sim={sim} body={body} onDeselect={() => {}} frame={1} />, container);
    await new Promise(r => setTimeout(r));
    const labels2 = Array.from(container.querySelectorAll('label'));
    const posX2 = labels2.find(l => l.textContent?.startsWith('Pos X'))!.querySelector('input') as HTMLInputElement;
    expect(posX2.value).toBe('2');
  });

});
