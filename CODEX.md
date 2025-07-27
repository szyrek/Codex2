# Project Overview

Welcome to Codex2! This repository is scaffolded using **documentation-driven development**. Create a `README.md` and an `AGENTS.md` in a folder only when it adds context or rules that aren't already covered by its parent directories. These documents help both human developers and AI coding agents understand the structure, intent, and rules of the codebase.

- `README.md` explains the purpose of the code within its folder and links to any additional documentation. Add one only when the folder introduces concepts not documented elsewhere.
- `AGENTS.md` provides AI-specific guidance for contributing safely and consistently. Include it only when a folder needs extra notes and always link back to `/AGENTS.md` for the full workflow.
- For any UI work consult [`doc/practices/UI.md`](doc/practices/UI.md) for design guidelines.
- Known setup problems are collected in [doc/KNOWN_ISSUES.md](doc/KNOWN_ISSUES.md).

A detailed workflow for all contributors is defined in [`doc/practices/CODING_RULES.md`](doc/practices/CODING_RULES.md). Core practices such as testing, feature work, bug fixing and refactoring are documented in the [`doc/practices/`](doc/practices/) folder. You should read those guidelines, including the commit message rules in [`doc/practices/COMMIT_MESSAGE.md`](doc/practices/COMMIT_MESSAGE.md), before proposing any changes. Further design or architecture notes may appear in other Markdown files, and they will be referenced from the local `README.md` and `AGENTS.md`.

This file is part of the initial project scaffolding and will evolve as the project grows.

## Features

Implemented features are recorded under [doc/feature](doc/feature/).
Historical bug fixes are kept in [doc/bugfix](doc/bugfix/).
Architecture decisions live in the [doc/adr](doc/adr/) folder.

## Documentation

All Markdown files can be compiled into a browsable set of docs. The exact build process is left to contributors.

## Testing

Run the available test suites and ensure they all succeed before committing changes.
