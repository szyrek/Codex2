#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkg = require(path.join(root, 'package.json'));
const [major, minor, patch] = pkg.version.split('.').map(n => parseInt(n, 10));
const docsRoot = path.join(root, 'spacesim', 'docs');
const majorDir = path.join(docsRoot, String(major));
const stampPath = path.join(majorDir, 'generated.json');

function gather(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'docs', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(gather(full));
    else if (entry.isFile() && entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

function copy(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function writeManifest(files) {
  fs.writeFileSync(path.join(majorDir, 'manifest.json'), JSON.stringify({ files }, null, 2));
}

function writeVersion() {
  fs.writeFileSync(path.join(docsRoot, 'version.json'), JSON.stringify({ version: pkg.version, major }, null, 2));
}

function sourcesNewer(ts) {
  return gather(root).some(f => fs.statSync(f).mtimeMs > ts);
}

fs.mkdirSync(docsRoot, { recursive: true });
let prev = null;
if (fs.existsSync(stampPath)) prev = JSON.parse(fs.readFileSync(stampPath, 'utf8'));

const stamp = Date.now();
let regenerate = true;
if (prev && prev.version === pkg.version && !sourcesNewer(prev.timestamp)) {
  regenerate = false;
}

if (!regenerate) {
  console.log('Docs are up to date');
  process.exit(0);
}

if (fs.existsSync(majorDir)) fs.rmSync(majorDir, { recursive: true, force: true });
fs.mkdirSync(majorDir, { recursive: true });

const files = gather(root).map(f => path.relative(root, f));
for (const file of files) {
  copy(path.join(root, file), path.join(majorDir, file));
}

writeManifest(files);
writeVersion();
fs.writeFileSync(stampPath, JSON.stringify({ version: pkg.version, minor, patch, timestamp: stamp }, null, 2));

if (prev && minor > prev.minor) {
  const log = path.join(majorDir, 'CHANGELOG.md');
  const entry = `\n## ${pkg.version} - ${new Date().toISOString().split('T')[0]}\n`;
  fs.appendFileSync(log, entry);
}

console.log('Documentation generated');
