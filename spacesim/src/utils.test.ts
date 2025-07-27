import { describe, it, expect } from 'vitest';
import { uniqueName, randomColor } from './utils';

describe('uniqueName', () => {
  it('returns base when unused', () => {
    expect(uniqueName('planet', [])).toBe('planet');
  });

  it('increments when base used', () => {
    const existing = ['planet', 'planet1'];
    expect(uniqueName('planet', existing)).toBe('planet2');
  });
});

describe('randomColor', () => {
  it('returns a hex color string', () => {
    const color = randomColor();
    expect(color).toMatch(/^#[0-9a-f]{6}$/);
  });
});
