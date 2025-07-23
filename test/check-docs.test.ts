import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { checkDocs, runCli } from '../check-docs';

describe('checkDocs', () => {
  it('reports missing files', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'docs-'));
    writeFileSync(path.join(dir, 'README.md'), '');
    writeFileSync(path.join(dir, 'AGENTS.md'), '');
    const sub = path.join(dir, 'sub');
    mkdirSync(sub);
    writeFileSync(path.join(sub, 'README.md'), '');
    const issues = checkDocs(dir);
    expect(issues.length).toBe(1);
    expect(issues[0].missingAgents).toBe(true);
    const status = runCli([dir]);
    expect(status).toBe(1);
    rmSync(dir, { recursive: true, force: true });
  });

  it('returns empty list when docs exist', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'docs-'));
    writeFileSync(path.join(dir, 'README.md'), '');
    writeFileSync(path.join(dir, 'AGENTS.md'), '');
    const sub = path.join(dir, 'sub');
    mkdirSync(sub);
    writeFileSync(path.join(sub, 'README.md'), '');
    writeFileSync(path.join(sub, 'AGENTS.md'), '');
    const issues = checkDocs(dir);
    expect(issues.length).toBe(0);
    const status = runCli([dir]);
    expect(status).toBe(0);
    rmSync(dir, { recursive: true, force: true });
  });
});
