# Playwright install failure

## Issue
Running `npm install` in `spacesim` fails because the Playwright package attempts to download browser binaries from `cdn.playwright.dev`. The network policy blocks this host so the postinstall script exits with an error.

## Root cause
Playwright downloads browsers during its `postinstall` step. Without internet access or with restricted domains, installation fails.

## Fix
We removed the `.npmrc` entry that skipped Playwright's browser download. The testing library now installs browsers automatically so no manual step is required.

## References
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
