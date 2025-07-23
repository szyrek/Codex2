# Overlay line color bug

## Issue
The throw line shown during body spawning was always green. It should change color based on the predicted orbit: red when a crash is inevitable, green for a stable orbit and blue when the body will escape.

## Root cause
`OverlayRenderer` hardcoded the stroke style to `'green'` and performed no analysis of the throw velocity relative to the gravitational field.

## Fix
A new helper `predictOrbitType` in `src/utils.ts` now predicts whether the thrown body will crash, remain in orbit or escape. `OverlayRenderer` uses this value to color the line red for crash course, green for stable orbit and blue for escape. Unit tests validate this behaviour.

## References
- See implementation commit.
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
