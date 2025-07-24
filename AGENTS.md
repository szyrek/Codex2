# Guidance for AI Coding Agents

## Quick Reference
The condensed rules are stored in `FAST_GUIDANCE.md`. Use that file when asked to
"be brief". It summarizes the workflow so you can recall it quickly. Review the
full documentation if anything is unclear or when the docs change.

Welcome, coding agent! Follow these instructions whenever you work in this repository:

1. **Read Documentation First**
   - Review the current folder's `README.md` and `AGENTS.md` along with those of its parents.
   - Consult the documents in [`docs/practices`](docs/practices/) for testing, feature, bug fix and refactoring procedures.
   - When working on user interfaces, also read [`docs/practices/UI.md`](docs/practices/UI.md).
2. **Comply with the Workflow**
   - Follow the standards defined in [`docs/practices/CODING_RULES.md`](docs/practices/CODING_RULES.md).
   - Format commit messages according to [`docs/practices/COMMIT_MESSAGE.md`](docs/practices/COMMIT_MESSAGE.md).
   - Write tests before implementing any change and ensure they all pass.
3. **Maintain Local Instructions**
   - Some subfolders include their own `AGENTS.md` with additional guidance. If present, read it before editing files in that folder.

These practices must not be altered without explicit approval. Raise concerns rather than modifying them silently.

## Environment Note
If `npm test` prints `npm warn Unknown env config "http-proxy"`, the environment has `npm_config_http_proxy` or `npm_config_https_proxy` set. Unset these variables (or use the newer `npm_config_proxy` names) to silence the warning.
