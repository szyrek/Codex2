# 3D renderer issues

The switch to `ThreeRenderer` introduced a few visual glitches:

- Pointer coordinates did not account for `devicePixelRatio`, causing spawned bodies to appear offset on high-DPI screens.
- Orbit lines persisted after `Simulation.reset()` because `ThreeRenderer` kept them in a map when no bodies were present.
- Body labels were no longer drawn since the canvas renderer handled text and was removed.

## Fix

- `CanvasView` now scales the canvas and pointer coordinates by `devicePixelRatio`.
- `ThreeRenderer.updateOrbits` clears all lines when no bodies are provided.
- A new `BodyLabels` component renders body names using absolutely positioned HTML elements.

See related tests and commits.

References: [practices/BUGFIX.md](../../practices/BUGFIX.md)
