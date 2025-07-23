# Orbit overlays

Active bodies display a dotted line predicting their orbit.

- `OverlayRenderer` simulates each body around the most massive one and draws the path.
- Lines use the body's color but turn **blue** on escape trajectories and **red** when doomed to crash.
- Unit tests cover the color logic in `src/overlayRenderer.test.ts`.
