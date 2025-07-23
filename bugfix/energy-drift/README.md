# Orbital energy drift

## Issue
Bodies in the solar system scenario slowly gained orbital energy even when no new forces were added. Earth would spiral outward over time.

## Root cause
`PhysicsEngine` applied gravity from only the most massive parent to each body. Forces were not paired, so momentum and energy were not conserved and numerical errors accumulated.

## Fix
Gravity is now calculated symmetrically between every pair of bodies. A unit test checks that total energy of a simple two body system stays approximately constant over many steps.

## References
- See commit implementing the fix.
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
