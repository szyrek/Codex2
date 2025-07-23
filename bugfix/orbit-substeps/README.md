# Orbit drift with single substep

## Issue
The energy-drift fix introduced sub-stepping in `PhysicsEngine`, but the `Simulation` class still instantiated the engine with the default single substep. In long-running scenarios orbital energy slowly increased and bodies drifted away.

## Root cause
`Simulation` created `new PhysicsEngine()` which defaults to `subSteps = 1`. The integration error of Planck.js accumulates with such a large step.

## Fix
`Simulation` now constructs `PhysicsEngine(5)` so each tick is divided into five substeps. A regression test verifies that energy differs significantly when only one substep is used.

## References
- commit implementing the fix
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
