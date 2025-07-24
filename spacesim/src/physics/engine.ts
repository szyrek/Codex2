import planck, { Vec2, World } from 'planck-js';

// eslint-disable-next-line @typescript-eslint/no-var-requires

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

export class PhysicsEngine {
  private world: World;
  public bodies: { body: planck.Body; data: BodyData }[] = [];

  constructor() {
    this.world = new planck.World({ gravity: Vec2(0, 0) });
  }

  addBody(position: Vec2, velocity: Vec2, data: BodyData) {
    const body = this.world.createDynamicBody({
      position,
      linearVelocity: velocity,
    });
    const density = data.mass / (Math.PI * data.radius * data.radius);
    body.createFixture(planck.Circle(data.radius), { density, isSensor: true });
    const entry = { body, data };
    this.bodies.push(entry);
    return entry;
  }

  removeBody(target: { body: planck.Body; data: BodyData }) {
    const idx = this.bodies.indexOf(target);
    if (idx >= 0) {
      this.world.destroyBody(target.body);
      this.bodies.splice(idx, 1);
    }
  }

  reset() {
    this.world = new planck.World({ gravity: Vec2(0, 0) });
    this.bodies = [];
  }

  findBody(point: Vec2) {
    return this.bodies.find((b) =>
      Vec2.distance(b.body.getPosition(), point) <= b.data.radius
    );
  }

  updateBody(
    target: { body: planck.Body; data: BodyData },
    updates: Partial<BodyData> & { position?: Vec2; velocity?: Vec2 }
  ) {
    if (updates.mass !== undefined || updates.radius !== undefined) {
      const mass = updates.mass ?? target.data.mass;
      const radius = updates.radius ?? target.data.radius;
      const fixture = target.body.getFixtureList();
      if (fixture) target.body.destroyFixture(fixture);
      const density = mass / (Math.PI * radius * radius);
      target.body.createFixture(planck.Circle(radius), { density, isSensor: true });
      target.body.resetMassData();
      if (updates.mass !== undefined) target.data.mass = updates.mass;
      if (updates.radius !== undefined) target.data.radius = updates.radius;
    const newMass = updates.mass ?? target.data.mass;
    const newRadius = updates.radius ?? target.data.radius;
    if (updates.mass !== undefined || updates.radius !== undefined) {
      const fixture = target.body.getFixtureList();
      if (fixture) target.body.destroyFixture(fixture);
      const density = newMass / (Math.PI * newRadius * newRadius);
      target.body.createFixture(planck.Circle(newRadius), { density });
      target.body.resetMassData();
      target.data.mass = newMass;
      target.data.radius = newRadius;
    }
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
    if (updates.position) {
      target.body.setPosition(updates.position);
    }
    if (updates.velocity) {
      target.body.setLinearVelocity(updates.velocity);
    }
  }

  private applyGravity() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const posA = a.body.getPosition();
        const posB = b.body.getPosition();
        const r = Vec2.sub(posB, posA);
        const distSq = r.lengthSquared();
        if (distSq === 0) continue;
        const forceMag = (G * a.data.mass * b.data.mass) / distSq;
        const force = r.clone().mul(forceMag / Math.sqrt(distSq));
        a.body.applyForceToCenter(force, true);
        b.body.applyForceToCenter(force.neg(), true);
      }
    }
  }

  private resolveCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const posA = a.body.getPosition();
        const posB = b.body.getPosition();
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

  private mergeBodies(big: { body: planck.Body; data: BodyData }, small: { body: planck.Body; data: BodyData }) {
    const m1 = big.data.mass;
    const m2 = small.data.mass;
    const total = m1 + m2;
    const pos = Vec2.add(big.body.getPosition().mul(m1), small.body.getPosition().mul(m2)).mul(1 / total);
    const vel = Vec2.add(big.body.getLinearVelocity().mul(m1), small.body.getLinearVelocity().mul(m2)).mul(1 / total);
    const radius = Math.sqrt(big.data.radius * big.data.radius + small.data.radius * small.data.radius);
    this.updateBody(big, { mass: total, radius });
    big.body.setLinearVelocity(vel);
    big.body.setPosition(pos);
    this.removeBody(small);
  }

  private bounceBodies(a: { body: planck.Body; data: BodyData }, b: { body: planck.Body; data: BodyData }, n: Vec2, dist: number) {
    const unit = n.clone().mul(1 / dist);
    const vA = a.body.getLinearVelocity();
    const vB = b.body.getLinearVelocity();
    const alongA = Vec2.dot(vA, unit);
    const alongB = Vec2.dot(vB, unit);
    const relAlong = alongB - alongA;
    if (relAlong >= 0) return;
    const m1 = a.data.mass;
    const m2 = b.data.mass;
    const perpA = vA.clone().sub(unit.clone().mul(alongA));
    const perpB = vB.clone().sub(unit.clone().mul(alongB));
    const newAlongA = ((m1 - m2) / (m1 + m2)) * alongA + (2 * m2 / (m1 + m2)) * alongB;
    const newAlongB = ((m2 - m1) / (m1 + m2)) * alongB + (2 * m1 / (m1 + m2)) * alongA;
    a.body.setLinearVelocity(perpA.add(unit.clone().mul(newAlongA)));
    b.body.setLinearVelocity(perpB.add(unit.clone().mul(newAlongB)));
    const overlap = (a.data.radius + b.data.radius - dist) / 2 + 0.01;
    a.body.setPosition(Vec2.sub(a.body.getPosition(), unit.clone().mul(overlap)));
    b.body.setPosition(Vec2.add(b.body.getPosition(), unit.clone().mul(overlap)));
  }

  step(dt: number) {
    this.applyGravity();
    this.world.step(dt);
    this.resolveCollisions();
  }

  getWorld() {
    return this.world;
  }
}
