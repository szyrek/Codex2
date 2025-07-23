import { Vec2 } from "planck-js";
export function uniqueName(base: string, existing: string[]): string {
  if (!existing.includes(base)) return base;
  let i = 1;
  let candidate = `${base}${i}`;
  while (existing.includes(candidate)) {
    i++;
    candidate = `${base}${i}`;
  }
  return candidate;
}

export function throwVelocity(start: Vec2, end: Vec2, zoom = 1) {
  const drag = Vec2.sub(end, start);
  const dist = drag.length();
  const px = dist * zoom;
  if (px <= 3) return Vec2();
  const scale = 0.01 * px * px / (px + 50) / (dist || 1);
  return drag.mul(scale);
}

export type OrbitType = 'crash' | 'stable' | 'escape';

export function predictOrbitType(
  position: Vec2,
  velocity: Vec2,
  centralPos: Vec2,
  centralMass: number,
  centralRadius: number,
  Gconst: number
): OrbitType {
  const rVec = Vec2.sub(position, centralPos);
  const r = rVec.length();
  const v2 = velocity.lengthSquared();
  const mu = Gconst * centralMass;
  const energy = 0.5 * v2 - mu / r;
  if (energy < 0) {
    const h = rVec.x * velocity.y - rVec.y * velocity.x;
    const e = Math.sqrt(
      Math.max(0, 1 + (2 * energy * h * h) / (mu * mu))
    );
    const a = -mu / (2 * energy);
    const rp = a * (1 - e);
    if (rp <= centralRadius) return 'crash';
    return 'stable';
  }
  return 'escape';
}
