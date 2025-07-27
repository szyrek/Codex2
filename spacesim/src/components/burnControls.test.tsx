import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import BurnControls from './BurnControls';

describe('BurnControls', () => {
  it('renders three inputs', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BurnControls />, container);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(3);
  });

  it('shows info when tuned and hides on abort', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<BurnControls />, container);
    const button = container.querySelector('button') as HTMLButtonElement;
    button.click();
    await Promise.resolve();
    expect(container.querySelector('.burn-info')).not.toBeNull();
    const abort = container.querySelector('button') as HTMLButtonElement;
    abort.click();
    await Promise.resolve();
    expect(container.querySelector('.burn-info')).toBeNull();
  });
});
