# Renderer Lighting

The Three.js renderer now includes basic lighting.

- An ambient light provides overall illumination.
- A point light tracks the most massive body to simulate a sun.
- `ThreeRenderer` updates the light position each frame.
- Unit tests cover the light behaviour.

## Tests
- `spacesim/src/threeRenderer.test.ts`
