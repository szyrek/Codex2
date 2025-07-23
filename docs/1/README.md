# Project Overview

Welcome to Codex2! This repository is scaffolded using **documentation-driven development**. Create a `README.md` and an `AGENTS.md` in a folder only when it adds context or rules that aren't already covered by its parent directories. These documents help both human developers and AI coding agents understand the structure, intent, and rules of the codebase.

- `README.md` explains the purpose of the code within its folder and links to any additional documentation. Add one only when the folder introduces concepts not documented elsewhere.
- `AGENTS.md` provides AI-specific guidance for contributing safely and consistently. Include it when specialised instructions are needed for that folder.
- For any UI work consult [`practices/UI.md`](practices/UI.md) for design guidelines.

A detailed workflow for all contributors is defined in [`practices/CODING_RULES.md`](practices/CODING_RULES.md). Core practices such as testing, feature work, bug fixing and refactoring are documented in the [`practices/`](practices/) folder. You should read those guidelines, including the commit message rules in [`practices/COMMIT_MESSAGE.md`](practices/COMMIT_MESSAGE.md), before proposing any changes. Further design or architecture notes may appear in other Markdown files, and they will be referenced from the local `README.md` and `AGENTS.md`.

This file is part of the initial project scaffolding and will evolve as the project grows.

## Example

See [example/](example/) for a minimal TypeScript web app demonstrating the workflow in action. It provides build scripts, tests and documentation for a complete unit of work.

## Features

Implemented features are documented under the [feature/](feature/) directory. Each entry links to the commits and has an accompanying end-to-end test.

## Documentation

All Markdown files in the repository can be compiled into a browsable set of docs.
Run `npm run docs` at the repository root to regenerate them. The output appears
under `docs/<major>` based on the package version.
