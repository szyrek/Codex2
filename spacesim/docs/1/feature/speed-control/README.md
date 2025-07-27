# Simulation Speed Control

The simulation toolbar now lets users change how fast physics runs.

- `Simulation` tracks a speed multiplier (1–64) and scales the timestep.
- New buttons «««, xN and »»» adjust or reset the speed.
- Rendering stays fixed at 25 fps.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/e2e/controls.spec.ts`

