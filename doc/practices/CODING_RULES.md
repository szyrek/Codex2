# Coding Rules

This document defines the lifecycle that all contributors must follow. It applies to human developers and AI coding agents alike.

## 1. Read Documentation
- Review the `README.md` and `AGENTS.md` files in the current and parent folders.
- Understand the goals and constraints of the code you are about to modify.
- Consult the guides in this [`practices/`](.) folder for testing, features and bug fixes.
 - Skim `../bugfix/` for similar issues when planning features or refactors.
 - Review [../KNOWN_ISSUES.md](../KNOWN_ISSUES.md) if you run into environment problems.

## 2. Update Documentation
- Modify or add Markdown files to describe planned changes before implementation.
- If the architecture at a higher level is impacted, update documentation in parent folders as well.

## 3. Write Commit Messages
- Follow [COMMIT_MESSAGE.md](COMMIT_MESSAGE.md) for commit message formatting.
- Reference any relevant feature or bugfix folder in the message body.
## 4. Write Tests First (TDD)
- Implement automated tests that define expected behavior.
- Ensure tests fail before the corresponding implementation exists.

## 5. Implement the Functionality
- Write just enough code to satisfy the tests.
- Follow established coding style and architecture conventions.
- If your changes touch the UI, adhere to [UI Design Best Practices](UI.md).

## 6. Run and Pass All Tests
- Execute all available test suites until they succeed.
- Fix any failing tests before proceeding.

## 7. Expand Test Coverage
- Add tests for edge cases and important code branches.
- Aim for robust coverage to prevent regressions.

## 8. Quality Gates
- Automated tests must achieve at least **60% line coverage**.
- The default build will fail if this threshold is not met.

## 9. Refactor with Confidence
- Improve code clarity and structure without altering behavior.
- Follow [REFACTORING.md](REFACTORING.md) for detailed guidance.
- Rerun all tests after refactoring to confirm correctness.

## 10. Finalize Documentation
- Ensure all affected `README.md` and `AGENTS.md` files are accurate and complete.
 - Record feature or bug fix details in the appropriate folder under `doc/feature` or `doc/bugfix`.
- Verify that documentation and implementation stay in sync.

No change is complete until documentation and tests are comprehensive and current.
