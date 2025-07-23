const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const assert = require('assert');

function run(cmd){
  return execSync(cmd, {encoding: 'utf8'});
}

const perfDir = path.join(__dirname, '..', 'spacesim', 'performance');
const baseline = path.join(perfDir, 'results.json');
const latest = path.join(perfDir, 'latest.json');

function cleanup(){
  if(fs.existsSync(baseline)) fs.unlinkSync(baseline);
  if(fs.existsSync(latest)) fs.unlinkSync(latest);
}

try {
  cleanup();
  // slower case
  fs.writeFileSync(baseline, JSON.stringify({files:[{groups:[{benchmarks:[{name:'bench', mean:10}]}]}]}));
  fs.writeFileSync(latest, JSON.stringify({files:[{groups:[{benchmarks:[{name:'bench', mean:12}]}]}]}));
  const outSlow = run('node spacesim/performance/compare.js');
  assert(outSlow.includes('Warning'));

  // faster case should update baseline
  fs.writeFileSync(latest, JSON.stringify({files:[{groups:[{benchmarks:[{name:'bench', mean:9}]}]}]}));
  const outFast = run('node spacesim/performance/compare.js');
  assert(!outFast.includes('Warning'));
  const data = JSON.parse(fs.readFileSync(baseline, 'utf8'));
  const mean = data.files[0].groups[0].benchmarks[0].mean;
  assert(mean === 9);
  cleanup();
  console.log('tests passed');
} catch(err) {
  console.error(err);
  process.exit(1);
}
