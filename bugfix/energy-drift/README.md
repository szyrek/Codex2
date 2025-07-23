# Orbital energy drift

## Issue
Bodies in the solar system scenario slowly gained orbital energy even when no new forces were added. Earth would spiral outward over time.

## Root cause
`PhysicsEngine` originally applied gravity from only the most massive parent, leading to unpaired forces and energy gain. After applying symmetric forces the drift persisted. Investigation showed the semi-implicit integrator in Planck.js accumulates error when the time step is too large.

## Fix
Gravity is still applied symmetrically but each `step()` now divides the timestep into several smaller sub-steps. By applying gravity and running `World.step` repeatedly the integration error remains bounded and orbital energy stays stable. The "sphere of influence" shortcut remains disabled so forces are always paired.

## References
- See commit implementing the fix.
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
