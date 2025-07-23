# Simulation Clock

The control panel displays the elapsed simulation time.

- `Simulation` exposes a `time` getter and updates it each physics step.
- `SimulationComponent` listens to render events and shows **Time N.Ns**.
- Styled via `.sim-time` in `style.css`.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/src/components/simulationComponent.test.tsx`
- `spacesim/e2e/time.spec.ts`
