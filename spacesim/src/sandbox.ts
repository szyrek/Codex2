import planck, { Vec2, World } from 'planck-js';

export interface BodyData {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

const G = 1; // gravitational constant (arbitrary units)

export class Sandbox {
  private world: World;
  public bodies: { body: planck.Body; data: BodyData }[] = [];

  constructor() {
    this.world = new planck.World({ gravity: Vec2(0, 0) });
  }

  addBody(position: Vec2, velocity: Vec2, data: BodyData): { body: planck.Body; data: BodyData } {
    const body = this.world.createDynamicBody({
      position,
      linearVelocity: velocity,
    });
    body.createFixture(planck.Circle(data.radius), { density: data.mass });
    const entry = { body, data };
    this.bodies.push(entry);
    return entry;
  }

  /** Remove all bodies and create a fresh world */
  reset() {
    this.world = new planck.World({ gravity: Vec2(0, 0) });
    this.bodies = [];
  }

  /** Find the first body under the given point */
  findBody(point: Vec2) {
    return this.bodies.find((b) =>
      Vec2.distance(b.body.getPosition(), point) <= b.data.radius
    );
  }

  /** Update properties of an existing body */
  updateBody(target: { body: planck.Body; data: BodyData }, updates: Partial<BodyData>) {
    if (updates.mass !== undefined) {
      const fixture = target.body.getFixtureList();
      if (fixture) {
        fixture.setDensity(updates.mass);
        target.body.resetMassData();
      }
      target.data.mass = updates.mass;
    }
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
  }

  step(dt: number) {
    // apply gravity between all pairs
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
        // apply equal and opposite forces
        a.body.applyForceToCenter(force, true);
        b.body.applyForceToCenter(force.neg(), true);
      }
    }
    this.world.step(dt);
  }

  getWorld() {
    return this.world;
  }
}
