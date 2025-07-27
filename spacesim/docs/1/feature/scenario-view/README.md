# Scenario View

A dedicated tab plays predefined scenarios.
The first implementation loads a hardcoded Solar System simulation where all planets spawn automatically.

- `ScenarioView` wraps `Simulation` with the `solarSystem` events.
- Switching to the **Scenario** tab loads the scenario and runs it immediately.
- Covered by unit and end-to-end tests.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/e2e/scenario.spec.ts`
