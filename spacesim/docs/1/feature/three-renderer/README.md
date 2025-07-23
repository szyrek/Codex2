# 3D Renderer

The simulation now draws bodies using [Three.js](https://threejs.org/). A new `ThreeRenderer` replaces the previous canvas based renderer. Spheres are synced with the physics engine each frame and rendered via an orthographic camera. Overlay elements like predicted orbits and the drag vector are also drawn with Three.js lines.

Related commits document the implementation and accompanying unit test.

## Tests
- `spacesim/src/threeRenderer.test.ts`
