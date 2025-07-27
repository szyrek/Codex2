# Physics time drift

## Issue
Orbital paths slowly diverged from expectations during long runs. The physics engine stepped using a fixed `dt`, but tick events arrived at inconsistent real-time intervals. Each step projected the world forward by the same amount of time regardless of how long actually passed.

## Root cause
`GameLoop` emitted a constant timestep to the simulation while real elapsed time varied. When frames were delayed the engine effectively skipped time, producing unrealistic orbits.

## Fix
`GameLoop` now tracks the last tick timestamp and calculates `dt` from the real elapsed time using `Date.now()`. The physics engine therefore advances by the exact amount of time that passed since the previous update.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
