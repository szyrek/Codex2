import { Vector3 } from 'three';
export type Vec3 = Vector3;
export function Vec3(x = 0, y = 0, z = 0): Vector3 {
  return new Vector3(x, y, z);
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return a.clone().add(b);
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return a.clone().sub(b);
}

export function distance(a: Vec3, b: Vec3): number {
  return a.distanceTo(b);
}
