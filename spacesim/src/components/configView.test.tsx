import { describe, it, expect } from 'vitest';
import { render } from 'preact';
import ConfigView from './ConfigView';

describe('ConfigView', () => {
  it('shows default configuration values', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<ConfigView />, container);
    const nameInput = container.querySelector('label input') as HTMLInputElement;
    expect(nameInput.value).toBe('TestShip-01');
    const volume = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(volume.value).toBe('75');
  });
});
