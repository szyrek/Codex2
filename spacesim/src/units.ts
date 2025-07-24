export const KG_PER_MASS_UNIT = 2e28; // 100 units -> ~Sun mass
export const M_PER_DISTANCE_UNIT = 1e9; // 1 unit -> one million km

export function unitsToKg(units: number): number {
  return units * KG_PER_MASS_UNIT;
}

export function kgToUnits(kg: number): number {
  return kg / KG_PER_MASS_UNIT;
}

export function unitsToMeters(units: number): number {
  return units * M_PER_DISTANCE_UNIT;
}

export function metersToUnits(m: number): number {
  return m / M_PER_DISTANCE_UNIT;
}

export function formatKg(kg: number): string {
  return kg.toExponential(2);
}

export function formatMeters(m: number): string {
  return m.toExponential(2);
}
