# Project Overview

Welcome to Codex2! This repository is scaffolded using **documentation-driven development**. Create a `README.md` and an `AGENTS.md` in a folder only when it adds context or rules that aren't already covered by its parent directories. These documents help both human developers and AI coding agents understand the structure, intent, and rules of the codebase.

- `README.md` explains the purpose of the code within its folder and links to any additional documentation. Add one only when the folder introduces concepts not documented elsewhere.
- `AGENTS.md` provides AI-specific guidance for contributing safely and consistently. Include it only when a folder needs extra notes and always link back to `/AGENTS.md` for the full workflow.
- For any UI work consult [`practices/UI.md`](practices/UI.md) for design guidelines.

A detailed workflow for all contributors is defined in [`practices/CODING_RULES.md`](practices/CODING_RULES.md). Core practices such as testing, feature work, bug fixing and refactoring are documented in the [`practices/`](practices/) folder. You should read those guidelines, including the commit message rules in [`practices/COMMIT_MESSAGE.md`](practices/COMMIT_MESSAGE.md), before proposing any changes. Further design or architecture notes may appear in other Markdown files, and they will be referenced from the local `README.md` and `AGENTS.md`.

This file is part of the initial project scaffolding and will evolve as the project grows.

## Features

Implemented features are documented under [docs/feature](docs/feature/) where each entry links to the commits and has an accompanying end-to-end test.

## Documentation

All Markdown files in the repository can be compiled into a browsable set of docs.
Run `npm run docs` at the repository root to regenerate them. The output appears
under `spacesim/docs/<major>` based on the package version.

## Testing

Run `npm test` to execute every test suite. This runs the Node scripts in
`test/`, then launches the Spacesim unit tests with coverage, its end-to-end
browser checks and the performance benchmarks.
The GitHub Actions workflow calls the same command and merges are blocked if any
test fails.
