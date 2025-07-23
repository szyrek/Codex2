const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const assert = require('assert');

function run(args){
  return spawnSync('node', args, {encoding:'utf8'});
}

function cleanup(type, name){
  const dir = path.join(__dirname, '..', type, name);
  if(fs.existsSync(dir)) fs.rmSync(dir, {recursive:true, force:true});
}

try {
  let res = run(['practices/new-record.js']);
  assert.strictEqual(res.status, 1);
  assert(res.stderr.includes('Usage:'));

  res = run(['practices/new-record.js', 'oops', 'name']);
  assert.strictEqual(res.status, 1);
  assert(res.stderr.includes('Usage:'));

  cleanup('feature', 'test-feat');
  run(['practices/new-record.js', 'feature', 'test-feat']);
  const featContent = fs.readFileSync(path.join(__dirname, '..', 'feature', 'test-feat', 'README.md'), 'utf8');
  assert(featContent.includes('purpose and high-level design decisions'));
  cleanup('feature', 'test-feat');

  cleanup('bugfix', 'test-bug');
  run(['practices/new-record.js', 'bugfix', 'test-bug']);
  const bugContent = fs.readFileSync(path.join(__dirname, '..', 'bugfix', 'test-bug', 'README.md'), 'utf8');
  assert(bugContent.includes('Identify why the bug occurred'));
  cleanup('bugfix', 'test-bug');

  console.log('tests passed');
} catch(err) {
  console.error(err);
  process.exit(1);
}
