import { Vec3 } from '../vector';

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return {
    r: (n >> 16) & 0xff,
    g: (n >> 8) & 0xff,
    b: n & 0xff,
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const n = (r << 16) | (g << 8) | b;
  return `#${n.toString(16).padStart(6, '0')}`;
}

function blendToRed(color: string, t: number) {
  const rgb = hexToRgb(color);
  const r = Math.round(rgb.r + (255 - rgb.r) * t);
  const g = Math.round(rgb.g * (1 - t));
  const b = Math.round(rgb.b * (1 - t));
  return rgbToHex({ r, g, b });
}

export interface BodyData {
  mass: number;
  radius: number;
  color: string;
  label: string;
}

export interface BodyUpdate extends Partial<BodyData> {
  position?: Vec3;
  velocity?: Vec3;
}

export interface Body {
  position: Vec3;
  velocity: Vec3;
}

export const G = 1; // gravitational constant (arbitrary units)

function collisionEnergy(a: { body: Body; data: BodyData }, b: { body: Body; data: BodyData }, n: Vec3) {
  const rel = b.body.velocity.clone().sub(a.body.velocity);
  const speed = rel.length();
  const mu = (a.data.mass * b.data.mass) / (a.data.mass + b.data.mass);
  const angle = Math.abs(rel.normalize().dot(n.clone().normalize()));
  const vol = (4 / 3) * Math.PI;
  const d1 = a.data.mass / (vol * Math.pow(a.data.radius, 3));
  const d2 = b.data.mass / (vol * Math.pow(b.data.radius, 3));
  const densityFactor = (d1 + d2) / 2;
  return 0.5 * mu * speed * speed * densityFactor * angle;
}

export class PhysicsEngine {
  public bodies: { body: Body; data: BodyData }[] = [];
  private merges: {
    big: { body: Body; data: BodyData };
    small: { body: Body; data: BodyData };
    elapsed: number;
    duration: number;
    bigMass: number;
    bigRadius: number;
    smallMass: number;
    smallRadius: number;
  }[] = [];

  addBody(position: Vec3, velocity: Vec3, data: BodyData) {
    const body: Body = { position: position.clone(), velocity: velocity.clone() };
    const entry = { body, data: { ...data } };
    this.bodies.push(entry);
    return entry;
  }

  removeBody(target: { body: Body; data: BodyData }) {
    const idx = this.bodies.indexOf(target);
    if (idx >= 0) this.bodies.splice(idx, 1);
  }

  reset() {
    this.bodies = [];
  }

  findBody(point: Vec3) {
    return this.bodies.find((b) => b.body.position.distanceTo(point) <= b.data.radius);
  }

  updateBody(target: { body: Body; data: BodyData }, updates: BodyUpdate) {
    if (updates.mass !== undefined) target.data.mass = updates.mass;
    if (updates.radius !== undefined) target.data.radius = updates.radius;
    if (updates.label !== undefined) target.data.label = updates.label;
    if (updates.color !== undefined) target.data.color = updates.color;
    if (updates.position) target.body.position.copy(updates.position);
    if (updates.velocity) target.body.velocity.copy(updates.velocity);
  }

  private applyGravity(dt: number) {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const r = b.body.position.clone().sub(a.body.position);
        const distSq = r.lengthSq();
        if (distSq === 0) continue;
        const dist = Math.sqrt(distSq);
        const forceMag = (G * a.data.mass * b.data.mass) / distSq;
        const force = r.multiplyScalar(forceMag / dist);
        const accelA = force.clone().multiplyScalar(1 / a.data.mass);
        const accelB = force.clone().multiplyScalar(-1 / b.data.mass);
        a.body.velocity.add(accelA.multiplyScalar(dt));
        b.body.velocity.add(accelB.multiplyScalar(dt));
      }
    }
  }

  private mergeBodies(big: { body: Body; data: BodyData }, small: { body: Body; data: BodyData }) {
    const duration = 1; // seconds
    this.merges.push({
      big,
      small,
      elapsed: 0,
      duration,
      bigMass: big.data.mass,
      bigRadius: big.data.radius,
      smallMass: small.data.mass,
      smallRadius: small.data.radius,
    });
  }

  private bounceBodies(a: { body: Body; data: BodyData }, b: { body: Body; data: BodyData }, n: Vec3, dist: number) {
    const unit = n.clone().multiplyScalar(1 / dist);
    const vA = a.body.velocity.clone();
    const vB = b.body.velocity.clone();
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
    a.body.velocity.copy(perpA.add(unit.clone().multiplyScalar(newAlongA)));
    b.body.velocity.copy(perpB.add(unit.clone().multiplyScalar(newAlongB)));
    const overlap = (a.data.radius + b.data.radius - dist) / 2 + 0.01;
    a.body.position.add(unit.clone().multiplyScalar(-overlap));
    b.body.position.add(unit.clone().multiplyScalar(overlap));
  }

  private updateMerges(dt: number) {
    for (let i = this.merges.length - 1; i >= 0; i--) {
      const m = this.merges[i];
      m.elapsed += dt;
      const t = Math.min(m.elapsed / m.duration, 1);
      const bigMass = m.bigMass + m.smallMass * t;
      const bigRadius = Math.sqrt(m.bigRadius * m.bigRadius + m.smallRadius * m.smallRadius * t);
      const smallMass = m.smallMass * (1 - t);
      const smallRadius = m.smallRadius * (1 - t);
      this.updateBody(m.big, { mass: bigMass, radius: bigRadius });
      this.updateBody(m.small, { mass: smallMass, radius: smallRadius });
      if (t >= 1) {
        this.removeBody(m.small);
        this.merges.splice(i, 1);
      }
    }
  }

  private resolveCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const n = b.body.position.clone().sub(a.body.position);
        const dist = n.length();
        const targetDist = a.data.radius + b.data.radius;
        if (dist >= targetDist || dist === 0) continue;
        const m1 = a.data.mass;
        const m2 = b.data.mass;
        const energy = collisionEnergy(a, b, n);
        const angle = Math.abs(b.body.velocity.clone().sub(a.body.velocity).normalize().dot(n.clone().normalize()));
        const glancing = angle < 0.3;
        if (!glancing && energy > 20) {
          // violent clash -> color shift
          a.data.color = blendToRed(a.data.color, 0.8);
          b.data.color = blendToRed(b.data.color, 0.8);
          this.mergeBodies(m1 > m2 ? a : b, m1 > m2 ? b : a);
          j--;
        } else if (m1 >= m2 * 3 || m2 >= m1 * 3 || energy < 5) {
          const big = m1 >= m2 ? a : b;
          const small = big === a ? b : a;
          big.data.color = blendToRed(big.data.color, Math.min(1, energy / 20));
          small.data.color = blendToRed(small.data.color, Math.min(1, energy / 20));
          this.mergeBodies(big, small);
          j--;
        } else {
          this.bounceBodies(a, b, n, dist);
          a.data.color = blendToRed(a.data.color, Math.min(1, energy / 20));
          b.data.color = blendToRed(b.data.color, Math.min(1, energy / 20));
        }
      }
    }
  }

  step(dt: number) {
    this.applyGravity(dt);
    for (const obj of this.bodies) {
      obj.body.position.add(obj.body.velocity.clone().multiplyScalar(dt));
    }
    this.updateMerges(dt);
    this.resolveCollisions();
  }
}
