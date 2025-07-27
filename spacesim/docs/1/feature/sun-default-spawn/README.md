# Sun default spawn

The spawner panel now starts with a Sun preset.

- On first use the panel shows a body labelled **Sun** with mass 100,
  radius 50 and yellow color.
- After spawning the Sun the panel switches to spawn **planet** objects
  with mass 1 and radius 5.
- Each subsequent spawn randomizes the planet's color.

## Tests
- `spacesim/src/components/spawnDefaults.test.tsx`
- `spacesim/src/utils.test.ts`

