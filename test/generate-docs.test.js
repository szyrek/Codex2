const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const assert = require('assert');

function run(cmd){
  execSync(cmd, {stdio:'inherit'});
}

const docsDir = path.join(__dirname, '..', 'spacesim', 'docs');

function cleanup(){
  if(fs.existsSync(docsDir)) fs.rmSync(docsDir, {recursive:true, force:true});
}

try {
  cleanup();
  run('node scripts/generate-docs.js');
  const major = require('../package.json').version.split('.')[0];
  const manifest = path.join(docsDir, major, 'manifest.json');
  assert(fs.existsSync(manifest));
  const list = JSON.parse(fs.readFileSync(manifest, 'utf8')).files;
  assert(list.includes('README.md'));
  cleanup();
  console.log('tests passed');
} catch(err) {
  console.error(err);
  process.exit(1);
}
