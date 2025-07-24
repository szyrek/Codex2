# Body Editor

Clicking an existing body opens a panel to inspect and edit its data.

- Mass, radius, color, **position** and **velocity** can all be changed and applied back to the running simulation.
- Position and velocity fields refresh each frame to show live values.
- Delete removes the body and closes the editor.
- The editor stays open after applying and closes when you click elsewhere.
- `Simulation` emits a `bodyUpdate` event whenever changes are applied.
- Implemented in `spacesim`.

## Tests
- `spacesim/e2e/edit.spec.ts`
- `spacesim/src/physics.test.ts`
