const fs = require('fs');
const path = require('path');
const enginePath = path.join(__dirname, '..', 'examples', 'rapier-engine', 'physics.mjs');
if (!fs.existsSync(enginePath)) {
  console.error('engine example missing');
  process.exit(1);
}
console.log('tests passed');
