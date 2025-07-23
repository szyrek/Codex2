# Highlight selected body

The list of bodies now visually marks which entry is selected.

- `BodyList` accepts a `selected` prop and applies a darker background to that entry.
- `Simulation` forwards the current selection to the list.
- A component test ensures the selected item is highlighted.
