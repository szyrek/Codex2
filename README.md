# Project Overview

Welcome to Codex2! This repository is scaffolded using **documentation-driven development**. Every directory in this project must include a `README.md` and an `AGENTS.md` file. These documents ensure that both human developers and AI coding agents understand the structure, intent, and rules of the codebase.

- `README.md` explains the purpose of the code within its folder and links to any additional documentation.
- `AGENTS.md` provides AI-specific guidance for contributing safely and consistently.

A detailed workflow for all contributors is defined in [`practices/CODING_RULES.md`](practices/CODING_RULES.md). Core practices such as testing, feature work and bug fixing are documented in the [`practices/`](practices/) folder. You should read those guidelines, including the commit message rules in [`practices/COMMIT_MESSAGE.md`](practices/COMMIT_MESSAGE.md), before proposing any changes. Further design or architecture notes may appear in other Markdown files, and they will be referenced from the local `README.md` and `AGENTS.md`.

This file is part of the initial project scaffolding and will evolve as the project grows.

## Example

See [example/](example/) for a minimal TypeScript web app demonstrating the workflow in action. It provides build scripts, tests and documentation for a complete unit of work.

## Documentation Checks

The script `check-docs.js` verifies that every directory contains both a
`README.md` and an `AGENTS.md`. Continuous integration runs this check on each
commit. Run it locally with:

```bash
node check-docs.js
```

## Features

Implemented features are documented under the [feature/](feature/) directory. Each entry links to the commits and has an accompanying end-to-end test.
