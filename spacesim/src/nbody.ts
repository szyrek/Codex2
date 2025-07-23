// Simple N-body physics with Velocity Verlet integration

export const G = 6.67430e-11; // gravitational constant
export const MIN_DIST = 1e-2; // softening to avoid singularities
export const MAX_DT = 1 / 60; // clamp timestep

export interface Body {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  mass: number;
}

export function updatePhysics(bodies: Body[], rawDt: number): void {
  const dt = Math.min(rawDt, MAX_DT);

  // store previous accelerations
  const prevAccels = bodies.map(b => ({ ax: b.ax, ay: b.ay }));

  // reset accelerations
  for (const b of bodies) {
    b.ax = 0;
    b.ay = 0;
  }

  // pairwise gravitational forces
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const b1 = bodies[i];
      const b2 = bodies[j];
      let dx = b2.x - b1.x;
      let dy = b2.y - b1.y;
      let distSq = dx * dx + dy * dy;
      let dist = Math.sqrt(distSq) + MIN_DIST;

      const force = (G * b1.mass * b2.mass) / (dist * dist);
      const fx = (force * dx) / dist;
      const fy = (force * dy) / dist;

      b1.ax += fx / b1.mass;
      b1.ay += fy / b1.mass;
      b2.ax -= fx / b2.mass;
      b2.ay -= fy / b2.mass;
    }
  }

  // velocity verlet integration
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    const prev = prevAccels[i];

    b.x += b.vx * dt + 0.5 * prev.ax * dt * dt;
    b.y += b.vy * dt + 0.5 * prev.ay * dt * dt;

    b.vx += 0.5 * (prev.ax + b.ax) * dt;
    b.vy += 0.5 * (prev.ay + b.ay) * dt;
  }
}

