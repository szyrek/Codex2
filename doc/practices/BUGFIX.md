# Bug Fix Guide

Follow these steps whenever you address a defect:

1. **Reproduce with Tests**
   - Write a failing test that captures the bug. This "bug test" remains in the
     suite to guard against regressions. It can be unit, integration or end to
     end, as long as it reproduces the issue.
   - Only begin coding the fix once the failure is verified.
2. **Root Cause Analysis**
   - Identify why the bug occurred and document the underlying issue in a new folder under `../bugfix/`.
   - Include notes on which parts of the architecture were affected and link to the relevant feature docs or commits.
   - Record any process issues uncovered and propose improvements.
3. **Implement Safely**
   - Keep the failing test in place until the fix passes.
   - Ensure unit coverage remains above the [Testing](TESTING.md) threshold.
4. **Document the Fix**
   - In the bug's folder, provide a clear changelog and reference to this guide and other practice docs.
   - Cross-reference previous bugfixes if the issue relates to them.
   - If the fix affects the UI, consult [UI Design Best Practices](UI.md) to ensure consistency.

> These practices are mandatory for both human developers and agents. Do not change them without explicit approval.
