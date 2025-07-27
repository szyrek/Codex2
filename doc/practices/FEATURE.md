# Feature Implementation Guide

When introducing a new feature, follow these principles:

1. **Test-Driven Development**
   - Write unit and integration tests first to describe the desired behaviour.
   - Do not implement functionality until failing tests prove the need.
   - Aim for at least 60% coverage as described in [Testing](TESTING.md).
   - Provide an end-to-end test for each user-facing capability. See the
     [Testing practices](TESTING.md) section on E2E tests.
2. **Documentation**
   - Create a new folder under `../feature/` named after the feature and include a `README.md` summarising:
   - purpose and high-level design decisions
   - links to relevant commits and architectural documents
   - changelog entries
   - Update any affected architecture docs and reference this feature folder from them.
   - If the feature changes the UI, review the guidelines in [UI Design Best Practices](UI.md).
3. **Review Past Bug Fixes**
   - Browse `../bugfix/` for records related to your changes.
   - Incorporate regression tests covering those failure cases.
   - Reference the bugfix entries you consulted in your feature `README.md`.
4. **Quality Gates**
   - The build must pass with required coverage before merging.
5. **Commit Messages**
   - Follow [COMMIT_MESSAGE.md](COMMIT_MESSAGE.md) when creating commits so changes are easy to trace.
6. **Link Everything**
   - Cross-reference this guide, [Bug Fix Guide](BUGFIX.md) and any other practice documents so future contributors can trace history easily.

> Agents must always comply with these practices. If a situation requires deviating, raise it for discussion rather than changing the rules silently.
