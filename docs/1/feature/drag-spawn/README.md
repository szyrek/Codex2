# Drag to Spawn Bodies

Dragging on the canvas spawns a new body. The drag distance and direction determine its initial velocity using `throwVelocity`.

- Very short drags still create a body but with near-zero velocity.
- A green line shows the drag vector while held.
- The body is created on mouse release using the parameters from the spawner panel and a unique label.
- Clicking an existing body selects it instead of starting a drag.
- Implemented in `spacesim`.
- End-to-end coverage: `spacesim/e2e/spawn.spec.ts`.
