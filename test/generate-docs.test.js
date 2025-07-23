const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const assert = require('assert');

function run(args){
  return spawnSync('node', args, {encoding: 'utf8'});
}

const docsDir = path.join(__dirname, '..', 'docs');

function cleanup(){
  if(fs.existsSync(docsDir)) fs.rmSync(docsDir, {recursive:true, force:true});
}

try {
  cleanup();
  run(['scripts/generate-docs.js']);
  const major = require('../package.json').version.split('.')[0];
  const manifest = path.join(docsDir, major, 'manifest.json');
  assert(fs.existsSync(manifest));
  const list = JSON.parse(fs.readFileSync(manifest, 'utf8')).files;
  assert(list.includes('README.md'));

  // second run should detect up-to-date docs
  const result = run(['scripts/generate-docs.js']);
  assert(result.stdout.includes('Docs are up to date'));

  console.log('tests passed');
} catch(err) {
  console.error(err);
  process.exit(1);
}
