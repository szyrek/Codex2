import { describe, it, expect } from 'vitest';
import { unitsToKg, kgToUnits, unitsToMeters, metersToUnits } from './units';

describe('unit conversions', () => {
  it('round trips mass', () => {
    const kg = 5e25;
    expect(unitsToKg(kgToUnits(kg))).toBeCloseTo(kg);
  });
  it('round trips distance', () => {
    const m = 3e9;
    expect(unitsToMeters(metersToUnits(m))).toBeCloseTo(m);
  });
});
