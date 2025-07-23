# Drag to Spawn Bodies

-Dragging on the canvas spawns a new body. The drag distance and direction determine its initial velocity using `throwVelocity`.

- Very short drags (under ~3 screen pixels) create a stationary body.
- A green line shows the drag vector while held.
- Drag distance is measured in screen space so the push feels consistent at any zoom level.
- The body is created on mouse release using the parameters from the spawner panel and a unique label.
- Clicking an existing body selects it instead of starting a drag.
- Implemented in `spacesim`.

## Tests
- `spacesim/e2e/spawn.spec.ts`
- `spacesim/src/throwVelocity.test.ts`
