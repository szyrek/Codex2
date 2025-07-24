# Scenario View

A dedicated panel plays predefined scenarios.
The Solar System scenario now uses real planet masses and orbital distances scaled for visibility. Bodies spawn with circular velocities around the Sun.

- `ScenarioChooser` wraps `Simulation` with the `solarSystem` events.
- Toggling the **Scenario** button opens the panel and runs the scenario immediately.
- Covered by unit and end-to-end tests.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/e2e/scenario.spec.ts`
