import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RAPIER: typeof import('@dimforge/rapier2d-compat') = require('@dimforge/rapier2d-compat');
import Vec2, { Vector } from '../vec2';

export interface BodyData {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

export interface BodyUpdate extends Partial<BodyData> {
  position?: Vector;
  velocity?: Vector;
}

export const G = 1; // gravitational constant (arbitrary units)

export class PhysicsEngine {
  private world: RAPIER.World;
  public bodies: { body: RAPIER.RigidBody; collider: RAPIER.Collider; data: BodyData }[] = [];

  constructor() {
    this.world = new RAPIER.World({ x: 0, y: 0 });
  }

  addBody(position: Vector, velocity: Vector, data: BodyData) {
    const rbDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(position.x, position.y)
      .setLinvel(velocity.x, velocity.y);
    const body = this.world.createRigidBody(rbDesc);
    const density = data.mass / (Math.PI * data.radius * data.radius);
    const colliderDesc = RAPIER.ColliderDesc.ball(data.radius)
      .setDensity(density)
      .setSensor(true);
    const collider = this.world.createCollider(colliderDesc, body);
    const entry = { body, collider, data };
    this.bodies.push(entry);
    return entry;
  }

  removeBody(target: { body: RAPIER.RigidBody; collider: RAPIER.Collider; data: BodyData }) {
    const idx = this.bodies.indexOf(target);
    if (idx >= 0) {
      this.world.removeRigidBody(target.body);
      this.bodies.splice(idx, 1);
    }
  }

  reset() {
    this.world = new RAPIER.World({ x: 0, y: 0 });
    this.bodies = [];
  }

  findBody(point: Vector) {
    return this.bodies.find((b) =>
      Vector.distance(b.body.translation(), point) <= b.data.radius
    );
  }

  updateBody(
    target: { body: RAPIER.RigidBody; collider: RAPIER.Collider; data: BodyData },
    updates: Partial<BodyData> & { position?: Vector; velocity?: Vector }
  ) {
    if (updates.mass !== undefined) {
      target.data.mass = updates.mass;
      const density = updates.mass / (Math.PI * target.data.radius * target.data.radius);
      target.collider.setDensity(density);
    }
    if (updates.radius !== undefined) {
      target.data.radius = updates.radius;
      target.collider.setRadius(updates.radius);
      const density = target.data.mass / (Math.PI * updates.radius * updates.radius);
      target.collider.setDensity(density);
    }
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
    if (updates.position) {
      target.body.setTranslation(updates.position, true);
    }
    if (updates.velocity) {
      target.body.setLinvel(updates.velocity, true);
    }
  }

  private applyGravity() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const posA = a.body.translation();
        const posB = b.body.translation();
        const r = Vector.sub(posB, posA);
        const dist = r.length();
        if (dist === 0) continue;
        const dir = r.clone().mul(1 / dist);
        const forceMag = (G * a.data.mass * b.data.mass) / (dist * dist);
        const force = dir.clone().mul(forceMag);
        a.body.addForce(force, true);
        b.body.addForce(force.clone().mul(-1), true);
      }
    }
  }

  private resolveCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const posA = a.body.translation();
        const posB = b.body.translation();
        const n = Vector.sub(posB, posA);
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

  private mergeBodies(big: { body: RAPIER.RigidBody; collider: RAPIER.Collider; data: BodyData }, small: { body: RAPIER.RigidBody; collider: RAPIER.Collider; data: BodyData }) {
    const m1 = big.data.mass;
    const m2 = small.data.mass;
    const total = m1 + m2;
    const pos = Vector.add(big.body.translation().clone().mul(m1), small.body.translation().clone().mul(m2)).mul(1 / total);
    const vel = Vector.add(big.body.linvel().clone().mul(m1), small.body.linvel().clone().mul(m2)).mul(1 / total);
    const radius = Math.sqrt(big.data.radius * big.data.radius + small.data.radius * small.data.radius);
    this.updateBody(big, { mass: total, radius });
    big.body.setLinvel(vel, true);
    big.body.setTranslation(pos, true);
    this.removeBody(small);
  }

  private bounceBodies(a: { body: RAPIER.RigidBody; data: BodyData }, b: { body: RAPIER.RigidBody; data: BodyData }, n: Vector, dist: number) {
    const unit = n.clone().mul(1 / dist);
    const vA = a.body.linvel();
    const vB = b.body.linvel();
    const alongA = vA.x * unit.x + vA.y * unit.y;
    const alongB = vB.x * unit.x + vB.y * unit.y;
    const relAlong = alongB - alongA;
    if (relAlong >= 0) return;
    const m1 = a.data.mass;
    const m2 = b.data.mass;
    const perpA = vA.clone().sub(unit.clone().mul(alongA));
    const perpB = vB.clone().sub(unit.clone().mul(alongB));
    const newAlongA = ((m1 - m2) / (m1 + m2)) * alongA + (2 * m2 / (m1 + m2)) * alongB;
    const newAlongB = ((m2 - m1) / (m1 + m2)) * alongB + (2 * m1 / (m1 + m2)) * alongA;
    a.body.setLinvel(perpA.add(unit.clone().mul(newAlongA)), true);
    b.body.setLinvel(perpB.add(unit.clone().mul(newAlongB)), true);
    const overlap = (a.data.radius + b.data.radius - dist) / 2 + 0.01;
    a.body.setTranslation(Vector.sub(a.body.translation(), unit.clone().mul(overlap)), true);
    b.body.setTranslation(Vector.add(b.body.translation(), unit.clone().mul(overlap)), true);
  }

  step(dt: number) {
    this.applyGravity();
    this.world.step();
    this.resolveCollisions();
  }

  getWorld() {
    return this.world;
  }
}
