# Body editor state refresh

## Issue
Selecting a different body in the sandbox did not update the editor inputs. Deleting operated on the latest selection, but the form still displayed data from the previous body.

## Root cause
`BodyEditor` initialised its internal state from the `body` prop only once. When a new body was selected the state remained unchanged so the UI showed stale values.

## Fix
The component now resets its state whenever the `body` prop changes. A unit test reproduces the bug and verifies the fix.

## References
- Implementation commit
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
