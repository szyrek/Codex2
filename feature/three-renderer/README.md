# Three.js Renderer

Bodies and orbit overlays render in a Three.js scene instead of Canvas2D.

- `ThreeRenderer` manages meshes and labels for bodies and delegates lines to `OverlayRenderer`.
- The simulation initializes this renderer when a canvas is set.
- Canvas sizing occurs in `CanvasView` so the renderer receives correct dimensions.
- Unit tests cover overlay line colours and canvas initialization logic.
