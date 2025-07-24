# Verlet Physics

- Adds a minimal N-body integrator implemented in `spacesim/src/nbody.ts`.
- Bodies store position, velocity, acceleration and mass.
- `updatePhysics` clamps the timestep, computes pairwise gravity with softening
  and advances bodies using velocity Verlet.

## Tests
- `spacesim/src/nbody.test.ts`
