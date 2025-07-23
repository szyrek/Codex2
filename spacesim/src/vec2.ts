export default function Vec2(x = 0, y = 0) {
  return new Vector(x, y);
}

export class Vector {
  constructor(public x: number = 0, public y: number = 0) {}

  clone() {
    return new Vector(this.x, this.y);
  }

  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mul(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length() {
    return Math.hypot(this.x, this.y);
  }

  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  static distance(a: Vector, b: Vector) {
    return a.clone().sub(b).length();
  }

  static add(a: Vector, b: Vector) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  static sub(a: Vector, b: Vector) {
    return new Vector(a.x - b.x, a.y - b.y);
  }
}

// Expose static helpers on the factory function for convenience
(Vec2 as any).add = Vector.add;
(Vec2 as any).sub = Vector.sub;
(Vec2 as any).distance = Vector.distance;
