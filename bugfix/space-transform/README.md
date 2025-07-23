# Coordinate space and timestep corrections

## Issue
Bodies drifted from predicted orbits after a few seconds. The canvas assumed a y-down coordinate system and used raw pixel units while the physics engine operated with y-up metres. Frame rate hiccups also caused large jumps in simulation time.

## Root cause
Screen coordinates were sent directly to the physics engine without flipping the y axis or converting units. `GameLoop` emitted a single tick per animation frame using whatever real delta time accumulated, so long frames advanced the physics too far at once.

## Fix
A new `spaceTransform` module converts between render pixels and simulation metres, handling the inverted y axis. `Simulation.worldToScreen` and `screenToWorld` now apply this scaling so input and rendering stay in sync. `GameLoop` accumulates partial steps and emits fixed-size ticks repeatedly when frames are delayed.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
