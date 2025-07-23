const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const assert = require('assert');

function run(cmd){
  execSync(cmd, {stdio:'inherit'});
}

function cleanup(type, name){
  const dir = path.join(__dirname, '..', type, name);
  if(fs.existsSync(dir)) fs.rmSync(dir, {recursive:true, force:true});
}

try {
  cleanup('feature', 'test-feat');
  run('node practices/new-record.js feature test-feat');
  const featContent = fs.readFileSync(path.join(__dirname, '..', 'feature', 'test-feat', 'README.md'), 'utf8');
  assert(featContent.includes('purpose and high-level design decisions'));
  cleanup('feature', 'test-feat');

  cleanup('bugfix', 'test-bug');
  run('node practices/new-record.js bugfix test-bug');
  const bugContent = fs.readFileSync(path.join(__dirname, '..', 'bugfix', 'test-bug', 'README.md'), 'utf8');
  assert(bugContent.includes('Identify why the bug occurred'));
  cleanup('bugfix', 'test-bug');

  console.log('tests passed');
} catch(err) {
  console.error(err);
  process.exit(1);
}
