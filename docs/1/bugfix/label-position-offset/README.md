# Label position offset

## Issue
Body labels did not align with their rendered bodies on high-DPI screens. After
fixing the spawn coordinate mapping the labels still appeared shifted to the
right and down.

## Root cause
`BodyLabels` used `Simulation.worldToScreen` which returns canvas pixel
coordinates. These values are scaled by `devicePixelRatio` while the absolutely
positioned HTML elements expect CSS pixel units. The mismatch produced an
offset equal to the ratio between canvas and style pixels.

## Fix
Labels now divide the `worldToScreen` result by `devicePixelRatio` before
setting their `left` and `top` styles. A unit test covers the scaling logic.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
