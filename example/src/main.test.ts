import { describe, it, expect, vi } from 'vitest';
import { setupRotation } from './main';

vi.useFakeTimers();

describe('rotation logic', () => {
  it('reverses rotation on click', () => {
    const img = document.createElement('img');
    setupRotation(img);

    vi.advanceTimersByTime(20);
    expect(img.style.transform).toBe('rotate(1deg)');

    vi.advanceTimersByTime(20);
    expect(img.style.transform).toBe('rotate(2deg)');

    img.click();
    vi.advanceTimersByTime(20);
    expect(img.style.transform).toBe('rotate(1deg)');
  });
});
