# Docs manifest conflict

## Issue
The documentation view in Spacesim failed to load any files. The version dropdown listed `1`, but selecting it produced an empty list.

## Root cause
`spacesim/docs/1/manifest.json` contained unresolved merge conflict markers. The invalid JSON caused the `fetch` call in `DocsView` to fail when parsing, so the list of documentation files never loaded.

## Fix
The docs were regenerated using `scripts/generate-docs.js`, which overwrites the manifest and other files with valid JSON. The `docs` view now loads correctly.
