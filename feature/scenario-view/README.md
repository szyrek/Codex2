# Scenario View

A dedicated tab plays predefined scenarios.
The Solar System scenario now uses real planet masses and orbital distances scaled for visibility. Bodies spawn with circular velocities around the Sun.

- `ScenarioView` wraps `Simulation` with the `solarSystem` events.
- Switching to the **Scenario** tab loads the scenario and runs it immediately.
- Covered by unit and end-to-end tests.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/e2e/scenario.spec.ts`
