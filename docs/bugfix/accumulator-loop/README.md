# Physics accumulator loop

## Issue
Long frames caused the simulation to advance with a very large `dt`. Bodies would shoot off course whenever the browser was paused or lost focus.

## Root cause
`Simulation.step` passed the raw time delta from `GameLoop` directly to the physics engine. When that value exceeded a few milliseconds the integration became unstable.

## Fix
`Simulation` now accumulates the delta and steps the physics engine in fixed `1/60s` increments. Each frame contributes at most `0.1s` to the accumulator to avoid the spiral of death. Tests cover the new behaviour.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
