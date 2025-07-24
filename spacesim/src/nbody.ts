// Simple N-body physics with Velocity Verlet integration in 3D

export const G = 6.67430e-11; // gravitational constant
export const MIN_DIST = 1e-2; // softening to avoid singularities
export const MAX_DT = 1 / 60; // clamp timestep

export interface Body {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  ax: number;
  ay: number;
  az: number;
  mass: number;
}

export function updatePhysics(bodies: Body[], rawDt: number): void {
  const dt = Math.min(rawDt, MAX_DT);

  const prevAccels = bodies.map(b => ({ ax: b.ax, ay: b.ay, az: b.az }));

  for (const b of bodies) {
    b.ax = 0;
    b.ay = 0;
    b.az = 0;
  }

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const b1 = bodies[i];
      const b2 = bodies[j];
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const dz = b2.z - b1.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const dist = Math.sqrt(distSq) + MIN_DIST;

      const force = (G * b1.mass * b2.mass) / (dist * dist);
      const fx = (force * dx) / dist;
      const fy = (force * dy) / dist;
      const fz = (force * dz) / dist;

      b1.ax += fx / b1.mass;
      b1.ay += fy / b1.mass;
      b1.az += fz / b1.mass;
      b2.ax -= fx / b2.mass;
      b2.ay -= fy / b2.mass;
      b2.az -= fz / b2.mass;
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    const prev = prevAccels[i];

    b.x += b.vx * dt + 0.5 * prev.ax * dt * dt;
    b.y += b.vy * dt + 0.5 * prev.ay * dt * dt;
    b.z += b.vz * dt + 0.5 * prev.az * dt * dt;

    b.vx += 0.5 * (prev.ax + b.ax) * dt;
    b.vy += 0.5 * (prev.ay + b.ay) * dt;
    b.vz += 0.5 * (prev.az + b.az) * dt;
  }
}
