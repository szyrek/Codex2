# Guidance for AI Coding Agents

Welcome, coding agent! Follow these instructions whenever you work in this repository:

1. **Read Documentation First**
   - Review the current folder's `README.md` and `AGENTS.md` along with those of its parents.
   - Consult the documents in [`practices/`](practices/) for testing, feature, bug fix and refactoring procedures.
   - When working on user interfaces, also read [`practices/UI.md`](practices/UI.md).
2. **Comply with the Workflow**
   - Follow the standards defined in [`practices/CODING_RULES.md`](practices/CODING_RULES.md).
   - Format commit messages according to [`practices/COMMIT_MESSAGE.md`](practices/COMMIT_MESSAGE.md).
   - Write tests before implementing any change and ensure they all pass.
3. **Maintain Local Instructions**
   - Some subfolders include their own `AGENTS.md` with additional guidance. If present, read it before editing files in that folder.

These practices must not be altered without explicit approval. Raise concerns rather than modifying them silently.

## Environment Note
If `npm test` prints `npm warn Unknown env config "http-proxy"`, the environment has `npm_config_http_proxy` or `npm_config_https_proxy` set. Unset these variables (or use the newer `npm_config_proxy` names) to silence the warning.
