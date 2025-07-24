# Ship Navigation Burn Controls

- Replaces the central window in `ShipView` with `NavigationView`, so dragging rotates the camera instead of spawning bodies.
- Adds a `BurnControls` component alongside the navigation screen with three input bars and an abort button.
- Body spawning is now limited to the Sandbox tab only.

Tests: `spacesim/src/components/burnControls.test.tsx` and updates in `shipView.test.tsx`.
