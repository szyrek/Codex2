import { Vector3 } from 'three';

export interface BodyData {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

export interface BodyUpdate3D extends Partial<BodyData> {
  position?: Vector3;
  velocity?: Vector3;
}

export const G = 1; // gravitational constant (arbitrary units)

export class PhysicsEngine3D {
  public bodies: { pos: Vector3; vel: Vector3; data: BodyData }[] = [];

  addBody(position: Vector3, velocity: Vector3, data: BodyData) {
    const entry = { pos: position.clone(), vel: velocity.clone(), data };
    this.bodies.push(entry);
    return entry;
  }

  removeBody(target: { pos: Vector3; vel: Vector3; data: BodyData }) {
    const idx = this.bodies.indexOf(target);
    if (idx >= 0) this.bodies.splice(idx, 1);
  }

  reset() {
    this.bodies = [];
  }

  findBody(point: Vector3) {
    return this.bodies.find(b => b.pos.distanceTo(point) <= b.data.radius);
  }

  updateBody(
    target: { pos: Vector3; vel: Vector3; data: BodyData },
    updates: BodyUpdate3D
  ) {
    if (updates.mass !== undefined) target.data.mass = updates.mass;
    if (updates.radius !== undefined) target.data.radius = updates.radius;
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
    if (updates.position) target.pos.copy(updates.position);
    if (updates.velocity) target.vel.copy(updates.velocity);
  }

  private applyGravity(dt: number) {
    const forces = this.bodies.map(() => new Vector3());
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const r = new Vector3().subVectors(b.pos, a.pos);
        const distSq = r.lengthSq();
        if (distSq === 0) continue;
        const forceMag = (G * a.data.mass * b.data.mass) / distSq;
        const force = r.clone().normalize().multiplyScalar(forceMag);
        forces[i].add(force);
        forces[j].addScaledVector(force, -1);
      }
    }
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      const acc = forces[i].clone().multiplyScalar(1 / body.data.mass);
      body.vel.addScaledVector(acc, dt);
    }
  }

  private mergeBodies(big: { pos: Vector3; vel: Vector3; data: BodyData }, small: { pos: Vector3; vel: Vector3; data: BodyData }) {
    const m1 = big.data.mass;
    const m2 = small.data.mass;
    const total = m1 + m2;
    const pos = big.pos.clone().multiplyScalar(m1).add(small.pos.clone().multiplyScalar(m2)).multiplyScalar(1 / total);
    const vel = big.vel.clone().multiplyScalar(m1).add(small.vel.clone().multiplyScalar(m2)).multiplyScalar(1 / total);
    const radius = Math.sqrt(big.data.radius * big.data.radius + small.data.radius * small.data.radius);
    this.updateBody(big, { mass: total, radius, position: pos, velocity: vel });
    this.removeBody(small);
  }

  private bounceBodies(a: { pos: Vector3; vel: Vector3; data: BodyData }, b: { pos: Vector3; vel: Vector3; data: BodyData }, n: Vector3, dist: number) {
    const unit = n.clone().multiplyScalar(1 / dist);
    const vA = a.vel;
    const vB = b.vel;
    const alongA = vA.dot(unit);
    const alongB = vB.dot(unit);
    const relAlong = alongB - alongA;
    if (relAlong >= 0) return;
    const m1 = a.data.mass;
    const m2 = b.data.mass;
    const perpA = vA.clone().sub(unit.clone().multiplyScalar(alongA));
    const perpB = vB.clone().sub(unit.clone().multiplyScalar(alongB));
    const newAlongA = ((m1 - m2) / (m1 + m2)) * alongA + (2 * m2 / (m1 + m2)) * alongB;
    const newAlongB = ((m2 - m1) / (m1 + m2)) * alongB + (2 * m1 / (m1 + m2)) * alongA;
    a.vel.copy(perpA.add(unit.clone().multiplyScalar(newAlongA)));
    b.vel.copy(perpB.add(unit.clone().multiplyScalar(newAlongB)));
    const overlap = (a.data.radius + b.data.radius - dist) / 2 + 0.01;
    a.pos.addScaledVector(unit, -overlap);
    b.pos.addScaledVector(unit, overlap);
  }

  private resolveCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const n = new Vector3().subVectors(b.pos, a.pos);
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

  step(dt: number) {
    this.applyGravity(dt);
    for (const body of this.bodies) {
      body.pos.addScaledVector(body.vel, dt);
    }
    this.resolveCollisions();
  }
}
