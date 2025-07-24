# Performance History

Benchmark runs now save their results so we can track performance over time.
After running `npm run test:perf` inside `spacesim`, a `latest.json` file
is written to `spacesim/performance` and compared against `results.json`.
If any benchmark runs slower than the previous result, a warning is printed.
When no slowdown is detected, the baseline `results.json` is updated.
