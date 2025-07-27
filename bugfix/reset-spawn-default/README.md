# Reset spawn default

## Issue
Pressing the Reset button cleared the simulation but left the spawner set to the last planet preset. Subsequent bodies spawned as planets instead of starting again from the Sun preset.

## Root cause
`Simulation` reset handled world state only. `SimulationComponent` kept its `spawnParams` state unchanged, so the UI continued using the previous planet parameters.

## Fix
The reset handler now also restores the initial Sun spawn parameters. A unit test reproduces the bug and verifies the fix.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
