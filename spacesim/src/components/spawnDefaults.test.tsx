import { describe, it, expect, vi } from 'vitest';
import { nextSpawnParams } from '../utils';

const sun = { mass: 100, radius: 50, color: '#ffff00', label: 'Sun' };

describe('nextSpawnParams', () => {
  it('switches from Sun to planet with random color', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const next = nextSpawnParams(sun);
    expect(next).toEqual({ mass: 1, radius: 5, color: '#000000', label: 'planet' });
  });

  it('keeps planet parameters and randomizes color', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.5);
    const first = nextSpawnParams(sun);
    const second = nextSpawnParams(first);
    expect(first.label).toBe('planet');
    expect(second.label).toBe('planet');
    expect(second.color).not.toBe(first.color);
  });
});
