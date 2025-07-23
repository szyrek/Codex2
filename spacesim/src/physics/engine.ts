import { Vec2 } from '../vec';

export interface BodyData {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

export interface BodyUpdate extends Partial<BodyData> {
  position?: Vec2;
  velocity?: Vec2;
}

export const G = 1; // gravitational constant (arbitrary units)

export interface Body {
  position: Vec2;
  velocity: Vec2;
}

export class PhysicsEngine {
  public bodies: { body: Body; data: BodyData }[] = [];
  private subSteps: number;

  constructor(subSteps = 1) {
    this.subSteps = subSteps;
  }

  addBody(position: Vec2, velocity: Vec2, data: BodyData) {
    const body: Body = { position: position.clone(), velocity: velocity.clone() };
    const entry = { body, data: { ...data } };
    this.bodies.push(entry);
    return entry;
  }

  removeBody(target: { body: Body; data: BodyData }) {
    const idx = this.bodies.indexOf(target);
    if (idx >= 0) {
      this.bodies.splice(idx, 1);
    }
  }

  reset() {
    this.bodies = [];
  }

  findBody(point: Vec2) {
    return this.bodies.find((b) => Vec2.distance(b.body.position, point) <= b.data.radius);
  }

  updateBody(
    target: { body: Body; data: BodyData },
    updates: BodyUpdate,
  ) {
    if (updates.mass !== undefined) target.data.mass = updates.mass;
    if (updates.radius !== undefined) target.data.radius = updates.radius;
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
    if (updates.position) target.body.position = updates.position.clone();
    if (updates.velocity) target.body.velocity = updates.velocity.clone();
  }

  private applyGravity(dt: number) {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const r = Vec2.sub(b.body.position, a.body.position);
        const distSq = r.lengthSq();
        if (distSq === 0) continue;
        const dist = Math.sqrt(distSq);
        const forceMag = (G * a.data.mass * b.data.mass) / distSq;
        const accelA = r.clone().multiplyScalar(forceMag / (dist * a.data.mass));
        const accelB = r.clone().multiplyScalar(-forceMag / (dist * b.data.mass));
        a.body.velocity.add(accelA.multiplyScalar(dt));
        b.body.velocity.add(accelB.multiplyScalar(dt));
      }
    }
  }

  private resolveCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const posA = a.body.position;
        const posB = b.body.position;
        const n = Vec2.sub(posB, posA);
        const dist = n.length();
        const targetDist = a.data.radius + b.data.radius;
        if (dist >= targetDist || dist === 0) continue;
        const m1 = a.data.mass;
        const m2 = b.data.mass;
        if (m1 >= m2 * 3) {
          this.mergeBodies(a, b);
          j--;
        } else if (m2 >= m1 * 3) {
          this.mergeBodies(b, a);
          j--;
        } else {
          this.bounceBodies(a, b, n, dist);
        }
      }
    }
  }

  private mergeBodies(big: { body: Body; data: BodyData }, small: { body: Body; data: BodyData }) {
    const m1 = big.data.mass;
    const m2 = small.data.mass;
    const total = m1 + m2;
    const pos = big.body.position.clone().multiplyScalar(m1)
      .add(small.body.position.clone().multiplyScalar(m2))
      .multiplyScalar(1 / total);
    const vel = big.body.velocity.clone().multiplyScalar(m1)
      .add(small.body.velocity.clone().multiplyScalar(m2))
      .multiplyScalar(1 / total);
    const radius = Math.sqrt(big.data.radius * big.data.radius + small.data.radius * small.data.radius);
    this.updateBody(big, { mass: total, radius, position: pos, velocity: vel });
    this.removeBody(small);
  }

  private bounceBodies(a: { body: Body; data: BodyData }, b: { body: Body; data: BodyData }, n: Vec2, dist: number) {
    const unit = n.clone().multiplyScalar(1 / dist);
    const vA = a.body.velocity.clone();
    const vB = b.body.velocity.clone();
    const alongA = Vec2.dot(vA, unit);
    const alongB = Vec2.dot(vB, unit);
    const relAlong = alongB - alongA;
    if (relAlong >= 0) return;
    const m1 = a.data.mass;
    const m2 = b.data.mass;
    const perpA = vA.sub(unit.clone().multiplyScalar(alongA));
    const perpB = vB.sub(unit.clone().multiplyScalar(alongB));
    const newAlongA = ((m1 - m2) / (m1 + m2)) * alongA + (2 * m2 / (m1 + m2)) * alongB;
    const newAlongB = ((m2 - m1) / (m1 + m2)) * alongB + (2 * m1 / (m1 + m2)) * alongA;
    a.body.velocity = perpA.add(unit.clone().multiplyScalar(newAlongA));
    b.body.velocity = perpB.add(unit.clone().multiplyScalar(newAlongB));
    const overlap = (a.data.radius + b.data.radius - dist) / 2 + 0.01;
    a.body.position.sub(unit.clone().multiplyScalar(overlap));
    b.body.position.add(unit.clone().multiplyScalar(overlap));
  }

  step(dt: number) {
    const subDt = dt / this.subSteps;
    for (let i = 0; i < this.subSteps; i++) {
      this.applyGravity(subDt);
      for (const obj of this.bodies) {
        obj.body.position.add(obj.body.velocity.clone().multiplyScalar(subDt));
      }
      this.resolveCollisions();
    }
  }
}
