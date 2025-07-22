# Coding Rules

This document defines the lifecycle that all contributors must follow. It applies to human developers and AI coding agents alike.

## 1. Read Documentation
- Review the `README.md` and `AGENTS.md` files in the current and parent folders.
- Understand the goals and constraints of the code you are about to modify.

## 2. Update Documentation
- Modify or add Markdown files to describe planned changes before implementation.
- If the architecture at a higher level is impacted, update documentation in parent folders as well.

## 3. Write Tests First (TDD)
- Implement automated tests that define expected behavior.
- Ensure tests fail before the corresponding implementation exists.

## 4. Implement the Functionality
- Write just enough code to satisfy the tests.
- Follow established coding style and architecture conventions.

## 5. Run and Pass All Tests
- Execute all available test suites until they succeed.
- Fix any failing tests before proceeding.

## 6. Expand Test Coverage
- Add tests for edge cases and important code branches.
- Aim for robust coverage to prevent regressions.

## 7. Refactor with Confidence
- Improve code clarity and structure without altering behavior.
- Rerun all tests after refactoring to confirm correctness.

## 8. Finalize Documentation
- Ensure all affected `README.md` and `AGENTS.md` files are accurate and complete.
- Verify that documentation and implementation stay in sync.

No change is complete until documentation and tests are comprehensive and current.
