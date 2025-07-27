# Guidance for AI Coding Agents

## Quick Reference
The condensed rules are stored in `doc/FAST_GUIDANCE.md`. Use that file when asked to
"be brief". It summarizes the workflow so you can recall it quickly. Review the
full documentation if anything is unclear or when the docs change.

Welcome, coding agent! Follow these instructions whenever you work in this repository:

1. **Read Documentation**
   - Review the local `CODEX.md` (or `README.md`) and `AGENTS.md` and then those in parent folders.
   - Consult [`doc/practices`](doc/practices/) for guides on testing, features, bug fixes and refactoring.
   - Skim `doc/bugfix/` for context when planning new work.
   - For UI tasks read [`doc/practices/UI.md`](doc/practices/UI.md).
2. **Comply with the Workflow**
   - Follow the standards defined in [`doc/practices/CODING_RULES.md`](doc/practices/CODING_RULES.md).
   - Format commit messages according to [`doc/practices/COMMIT_MESSAGE.md`](doc/practices/COMMIT_MESSAGE.md).
   - Write tests before implementing any change and ensure they all pass.
3. **Maintain Local Instructions**
   - Some folders include their own `AGENTS.md` with notes specific to that location. Keep these files short and link back here rather than repeating the entire workflow. If present, read them before editing files in that folder.

These practices must not be altered without explicit approval. Raise concerns rather than modifying them silently.

## Environment Note
Common setup or runtime problems are tracked in [doc/KNOWN_ISSUES.md](doc/KNOWN_ISSUES.md). Check that file if anything fails unexpectedly.
