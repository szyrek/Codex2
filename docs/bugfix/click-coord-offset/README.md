# Incorrect spawn position

## Issue
Bodies spawned offset to the right of the pointer. The farther right the canvas was clicked, the larger the offset.

## Root cause
`ThreeRenderer` called `renderer.setSize` without the `updateStyle` flag. This changed the canvas element's CSS width to the pixel width used for rendering, breaking the mapping between pointer coordinates and world coordinates.

## Fix
`ThreeRenderer` now preserves the canvas style dimensions by calling `setSize(width, height, false)`. Pointer coordinates once again translate directly to world positions.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
