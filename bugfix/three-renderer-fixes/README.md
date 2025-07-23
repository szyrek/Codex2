# 3D renderer issues

The switch to `ThreeRenderer` introduced a few visual glitches:

- Pointer coordinates did not account for `devicePixelRatio`, causing spawned bodies to appear offset on high-DPI screens.
- Orbit lines persisted after `Simulation.reset()` because `ThreeRenderer` kept them in a map when no bodies were present.
- Body labels were no longer drawn since the canvas renderer handled text and was removed.
- Y axes were flipped because the new camera uses an upward orientation while the old
  2D view assumed y increases downward. This caused clicks and throw lines to appear
  mirrored vertically.

## Fix

- `CanvasView` now scales the canvas and pointer coordinates by `devicePixelRatio`.
- `ThreeRenderer.updateOrbits` clears all lines when no bodies are provided.
- A new `BodyLabels` component renders body names using absolutely positioned HTML elements.
- `Simulation` now converts between world and screen coordinates with y-up logic
  so spawned bodies match clicks and throw direction behaves correctly.

See related tests and commits.

References: [practices/BUGFIX.md](../../practices/BUGFIX.md)
