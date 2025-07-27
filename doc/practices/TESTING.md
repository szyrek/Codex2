# Testing Practices

This repository follows a test-driven approach. Every feature begins with tests to define expected behavior before implementation.

## Unit Tests
- All logic should be unit tested.
- We target **60% line coverage** as a quality gate.
- The default build fails if coverage drops below this threshold.

## Integration Tests
- Modules that collaborate should have integration tests verifying interactions.

## End-to-End Tests
- For each defined user-facing feature we provide a browser-based test to validate behavior in the real application.
- Playwright is used for E2E testing in web projects.

## Performance Tests
- Benchmarks use a `bench` runner.
- These tests are manual and not part of automated builds.

Read [CODING_RULES.md](CODING_RULES.md) for the full workflow.
