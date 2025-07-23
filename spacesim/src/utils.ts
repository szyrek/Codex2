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

export function throwVelocity(start: Vec2, end: Vec2) {
  const drag = Vec2.sub(end, start);
  const speed = drag.length();
  if (speed < 5) return Vec2();
  return drag.mul(0.01 * speed / (speed + 50));
}
