import * as RAPIER from '@dimforge/rapier3d';

const gravity = { x: 0, y: 0, z: 0 };
export const world = new RAPIER.World(gravity);

const G = 6.67430e-11;

export function createBody(x: number, y: number, z: number, vx: number, vy: number, vz: number, mass: number): RAPIER.RigidBody {
  const desc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(x, y, z)
    .setLinvel(vx, vy, vz)
    .setAdditionalMass(mass);
  return world.createRigidBody(desc);
}

function applyOrbitalGravity() {
  const bodies = world.bodies();
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      const pa = a.translation();
      const pb = b.translation();
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dz = pb.z - pa.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const dist = Math.sqrt(distSq) + 1e-6;
      const forceMag = G * a.mass() * b.mass() / distSq;
      const fx = forceMag * dx / dist;
      const fy = forceMag * dy / dist;
      const fz = forceMag * dz / dist;
      a.applyForce({ x: fx, y: fy, z: fz }, true);
      b.applyForce({ x: -fx, y: -fy, z: -fz }, true);
    }
  }
}

export function stepPhysics(_dt: number) {
  applyOrbitalGravity();
  world.step();
}
