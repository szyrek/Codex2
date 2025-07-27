import { Vec3 } from './vector';
import { G } from './physics';

export interface OrbitalParams {
  height: number;
  speed: number;
  apoapsis: number;
  periapsis: number;
  inclination: number;
}

export function calcOrbitalParams(
  pos: Vec3,
  vel: Vec3,
  parentPos: Vec3,
  parentMass: number,
  parentRadius: number
): OrbitalParams {
  const rVec = pos.clone().sub(parentPos);
  const vVec = vel.clone();
  const r = rVec.length();
  const v = vVec.length();
  const height = r - parentRadius;
  const mu = G * parentMass;
  const energy = 0.5 * v * v - mu / r;
  const hVec = rVec.clone().cross(vVec);
  const h = hVec.length();
  let a = Infinity;
  let e = 0;
  if (energy < 0 && h !== 0) {
    a = -mu / (2 * energy);
    e = Math.sqrt(Math.max(0, 1 + (2 * energy * h * h) / (mu * mu)));
  }
  const apoapsis = a === Infinity ? Infinity : a * (1 + e) - parentRadius;
  const periapsis = a === Infinity ? height : a * (1 - e) - parentRadius;
  const inclination = h === 0 ? 0 : Math.acos(hVec.z / h) * (180 / Math.PI);
  return { height, speed: v, apoapsis, periapsis, inclination };
}
