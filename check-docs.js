const fs = require('fs');
const path = require('path');

const IGNORED = new Set(['node_modules', '.git', 'dist', 'coverage', '.github']);

function checkDocs(dir, issues = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasReadme = entries.some(e => e.isFile() && e.name.toLowerCase() === 'readme.md');
  const hasAgents = entries.some(e => e.isFile() && e.name.toLowerCase() === 'agents.md');
  if (!hasReadme || !hasAgents) {
    issues.push({ dir, missingReadme: !hasReadme, missingAgents: !hasAgents });
  }
  for (const entry of entries) {
    if (entry.isDirectory() && !IGNORED.has(entry.name)) {
      checkDocs(path.join(dir, entry.name), issues);
    }
  }
  return issues;
}


function runCli(args, logger = console) {
  const root = args[0] || process.cwd();
  const issues = checkDocs(root);
  if (issues.length) {
    for (const issue of issues) {
      const missing = [];
      if (issue.missingReadme) missing.push('README.md');
      if (issue.missingAgents) missing.push('AGENTS.md');
      logger.warn(`Warning: ${issue.dir} missing ${missing.join(' and ')}`);
    }
    logger.error(`Found ${issues.length} documentation issue${issues.length > 1 ? 's' : ''}.`);
    return 1;
  }
  return 0;
}

if (require.main === module) {
  const code = runCli(process.argv.slice(2));
  if (code) process.exit(code);
}

module.exports = { checkDocs, runCli };
