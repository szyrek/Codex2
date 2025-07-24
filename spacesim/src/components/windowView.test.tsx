import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import WindowView from './WindowView';

describe('WindowView', () => {
  it('updates transform based on yaw', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<WindowView yaw={10} pitch={0} />, container);
    await new Promise(r => setTimeout(r, 50));
    const img = container.querySelector('.window-image') as HTMLElement;
    expect(img.style.transform.length).toBeGreaterThan(0);
    render(<WindowView yaw={-10} pitch={0} />, container);
    await new Promise(r => setTimeout(r, 50));
    expect(img.style.transform).not.toBe('');
  });
});
