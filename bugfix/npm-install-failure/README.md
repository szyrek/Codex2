# Playwright install failure

## Issue
Running `npm install` in `spacesim` fails because the Playwright package attempts to download browser binaries from `cdn.playwright.dev`. The network policy blocks this host so the postinstall script exits with an error.

## Root cause
Playwright downloads browsers during its `postinstall` step. Without internet access or with restricted domains, installation fails.

## Fix
We set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` in a `postinstall` script inside `spacesim/package.json`. This stops Playwright from downloading browsers during installation so `npm install` succeeds offline. Browsers can still be installed manually when needed.

## References
- [practices/BUGFIX.md](../../practices/BUGFIX.md)
