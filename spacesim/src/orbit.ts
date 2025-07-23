import { Vec2 } from './vec';
import { G } from './physics';
import type { OrbitType } from './utils';

export const ESCAPE_RADIUS = 100;

export function simulateOrbit(
  pos: Vec2,
  vel: Vec2,
  central: Vec2,
  mass: number,
  radius: number,
  type: OrbitType,
  dt = 0.1,
  steps = 360,
) {
  const pts: Vec2[] = [];
  const mu = G * mass;
  const startR = pos.clone().sub(central);
  const r0 = startR.length();

  if (type === 'stable') {
    const v2 = vel.lengthSquared();
    const energy = 0.5 * v2 - mu / r0;
    const h = startR.x * vel.y - startR.y * vel.x;
    const a = -mu / (2 * energy);
    const e = Math.sqrt(Math.max(0, 1 + (2 * energy * h * h) / (mu * mu)));
    const eVec = Vec2((vel.y * h) / mu - startR.x / r0, (-vel.x * h) / mu - startR.y / r0);
    const phi = Math.atan2(eVec.y, eVec.x);
    const f0 = Math.atan2(startR.y, startR.x) - phi;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    for (let i = 0; i <= steps; i++) {
      const f = f0 + (i * 2 * Math.PI) / steps;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(f));
      const x = r * Math.cos(f);
      const y = r * Math.sin(f);
      const px = cosPhi * x - sinPhi * y;
      const py = sinPhi * x + cosPhi * y;
      pts.push(Vec2(px + central.x, py + central.y));
    }
    return pts;
  }

  let p = pos.clone();
  let v = vel.clone();
  for (let i = 0; i < 5000; i++) {
    const rVec = p.clone().sub(central);
    const dist = rVec.length();
    if (type === 'crash' && dist <= radius) break;
    if (type === 'escape' && dist >= ESCAPE_RADIUS) break;
    const acc = rVec.clone().multiplyScalar((-mu) / Math.pow(dist, 3));
    v = v.clone().add(acc.multiplyScalar(dt));
    p = p.clone().add(v.clone().multiplyScalar(dt));
    pts.push(p.clone());
  }
  return pts;
}
