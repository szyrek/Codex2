import { describe, it, expect } from 'vitest';
import { uniqueName } from './utils';

describe('uniqueName', () => {
  it('returns base when unused', () => {
    expect(uniqueName('planet', [])).toBe('planet');
  });

  it('increments when base used', () => {
    const existing = ['planet', 'planet1'];
    expect(uniqueName('planet', existing)).toBe('planet2');
  });
});
