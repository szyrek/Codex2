# Zoom, Pan and Center View

The simulation view can be zoomed, panned and centered on a body.

- `Simulation` tracks a `view` with `center` and `zoom` values and exposes helper methods.
- `ThreeRenderer` applies the transform when drawing the scene.
- `CanvasView` converts mouse coordinates using `screenToWorld`.
- Toolbar controls allow zooming with +/-, panning with arrows and centering on the selected body.
- Documented in this feature and covered by unit tests in `src/view.test.ts`.
