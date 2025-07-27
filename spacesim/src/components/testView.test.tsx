import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import TestView from './TestView';

describe('TestView', () => {
  it('loads layout from storage', () => {
    localStorage.setItem('test-layout', JSON.stringify({ a:{x:50,y:60}, b:{x:0,y:0}, c:{x:0,y:0} }));
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<TestView />, container);
    const a = container.querySelector('[data-id="a"]') as HTMLElement;
    expect(a.style.left).toBe('50px');
    expect(a.style.top).toBe('60px');
    localStorage.removeItem('test-layout');
  });

  it('toggles lock state', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<TestView />, container);
    const btn = container.querySelector('.lock-toggle') as HTMLButtonElement;
    expect(btn.dataset.locked).toBe('false');
    btn.click();
    await Promise.resolve();
    expect(btn.dataset.locked).toBe('true');
  });
});
