import { Vector2 } from 'three';

export type Vec2 = Vector2;
export function Vec2(x = 0, y = 0): Vec2 {
  return new Vector2(x, y);
}

(Vector2.prototype as any).lengthSquared = function(this: Vector2) {
  return this.lengthSq();
};

Vec2.add = (a: Vec2, b: Vec2) => a.clone().add(b);
Vec2.sub = (a: Vec2, b: Vec2) => a.clone().sub(b);
Vec2.dot = (a: Vec2, b: Vec2) => a.dot(b);
Vec2.distance = (a: Vec2, b: Vec2) => a.distanceTo(b);
Vec2.distanceSquared = (a: Vec2, b: Vec2) => a.distanceToSquared(b);
