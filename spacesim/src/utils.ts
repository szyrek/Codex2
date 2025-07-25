import { Vec3, sub } from "./vector";
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

export function throwVelocity(start: Vec3, end: Vec3) {
  const drag = sub(end, start);
  const speed = drag.length();
  if (speed < 5) return Vec3();
  return drag.multiplyScalar(0.01 * speed / (speed + 50));
}

export function randomColor() {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, '0')}`;
}

export interface SpawnParams {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

export function nextSpawnParams(current: SpawnParams): SpawnParams {
  if (current.label === 'Sun') {
    return { mass: 1, radius: 5, color: randomColor(), label: 'planet' };
  }
  return { ...current, color: randomColor(), label: 'planet' };
}

export type OrbitType = 'crash' | 'stable' | 'escape';

export function predictOrbitType(
  position: Vec3,
  velocity: Vec3,
  centralPos: Vec3,
  centralMass: number,
  centralRadius: number,
  Gconst: number
): OrbitType {
  const rVec = sub(position, centralPos);
  const r = rVec.length();
  const v2 = velocity.lengthSq();
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
