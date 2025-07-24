import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import BodyEditor from './BodyEditor';
import { Vec3 } from '../vector';

const makeBody = (label: string) => ({
  data: { label, mass: 1, radius: 1, color: '#fff' },
  body: { position: Vec3(), velocity: Vec3() }
});

const makeSim = (sun: any, body: any) => ({
  updateBody: () => {},
  removeBody: () => {},
  bodies: [sun, body]
} as any);

describe('BodyEditor', () => {
  it('updates fields when body prop changes', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const sun = makeBody('Sun');
    const bodyA = makeBody('a');
    const sim = makeSim(sun, bodyA);
    render(<BodyEditor sim={sim} body={bodyA} onDeselect={() => {}} frame={0} />, container);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('a');
    render(null, container);
    const bodyB = makeBody('b');
    const sim2 = makeSim(sun, bodyB);
    render(<BodyEditor sim={sim2} body={bodyB} onDeselect={() => {}} frame={1} />, container);
    await new Promise(r => setTimeout(r));
    const input2 = container.querySelector('input') as HTMLInputElement;
    expect(input2.value).toBe('b');
  });

  it('shows updated speed each frame', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const sun = makeBody('Sun');
    const body = makeBody('a');
    const sim = makeSim(sun, body);
    render(<BodyEditor sim={sim} body={body} onDeselect={() => {}} frame={0} />, container);
    expect(container.textContent).toContain('Speed 0.00e+0');
    (body.body as any).velocity = Vec3(1, 0, 0);
    render(<BodyEditor sim={sim} body={body} onDeselect={() => {}} frame={1} />, container);
    await new Promise(r => setTimeout(r));
    expect(container.textContent).toContain('Speed 1.00e+9');
  });

});
