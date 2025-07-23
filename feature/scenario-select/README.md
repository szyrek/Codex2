# Scenario Selection

Users can now choose between multiple predefined scenarios.
A dropdown in the Scenario tab lists available options and
switching selections reloads the simulation instantly.

- `ScenarioView` manages the selected scenario and passes
  the events to `Simulation`.
- Added `jupiterSystem` with Jupiter and its four largest moons.
- End-to-end test verifies that choosing a different scenario
  resets the simulation.

## Tests
- `spacesim/src/simulation.test.ts`
- `spacesim/e2e/scenario.spec.ts`
