# Performance Tests

Manual benchmarks verify simulation and rendering speed.

- Uses Vitest `bench` to run benchmarks.
- `npm run test:perf` executes the performance suite.
- `simulation.bench.ts` measures how many bodies we can step per frame and how large a speedup remains stable.
- `renderer.bench.ts` measures how many bodies we can draw before dropping below 25 fps using a mock canvas context.
- These tests run only when requested and are excluded from CI.
- Implemented in `spacesim`.
