# Gravity force mismatch

## Issue
Bodies with the same mass but different radii accelerated at noticeably different rates when approaching each other. Gravity calculations relied on Planck.js density, so the actual mass used by the physics engine scaled with body area. Large bodies therefore experienced much smaller acceleration.

## Root cause
`addBody` and `updateBody` set the fixture density equal to the mass value. Planck multiplies density by shape area to compute mass, so the simulation mass increased with radius. The gravitational force used the raw `data.mass` value which no longer matched the body's actual mass in the world, leading to inconsistent motion.

## Fix
Density is now derived from `mass / (πr²)` so Planck's computed mass matches the logical mass. `applyGravity` was rewritten using a clearer formula and tests verify that equal masses accelerate equally regardless of radius.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
