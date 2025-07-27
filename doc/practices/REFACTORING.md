# Refactoring Guide

Refactoring improves internal structure without changing external behaviour. Follow these guidelines before and during any refactor:

1. **Verify Coverage**
   - Ensure automated tests cover the affected code with meaningful assertions.
   - If coverage is lacking, expand tests first so real behaviour is locked in.
   - Review `../bugfix/` for regressions related to this code.
2. **Review Architecture**
   - Compare proposed refactors against current architecture documentation.
   - If the refactor implies architecture changes, document a proposal rather than editing architecture files directly. Await explicit approval before altering architecture docs.
3. **Update Tests and Docs**
   - Adjust tests to reflect any intentional behavioural changes.
   - Update `README.md` and `AGENTS.md` files so explanations match the refactored code.
   - Keep all practice documents and style rules in mind.
4. **Run All Tests**
   - Execute every available test suite after refactoring to confirm nothing broke.

These steps apply to both humans and agents. Maintain the coding standards defined in this folder and seek review if uncertain. See also [CODING_RULES.md](CODING_RULES.md) for the overall workflow.
