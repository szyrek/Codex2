#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const latestPath = path.join(dir, 'latest.json');
const baselinePath = path.join(dir, 'results.json');

function collectMeans(data){
  const result = {};
  if(!data.files) return result;
  for(const file of data.files){
    for(const group of file.groups||[]){
      for(const bench of group.benchmarks||[]){
        result[bench.name] = bench.mean;
      }
    }
  }
  return result;
}

if(!fs.existsSync(latestPath)){
  console.error('latest.json not found');
  process.exit(1);
}
const current = JSON.parse(fs.readFileSync(latestPath, 'utf8'));
const curr = collectMeans(current);
let baseline = null;
if(fs.existsSync(baselinePath)){
  baseline = collectMeans(JSON.parse(fs.readFileSync(baselinePath, 'utf8')));
}
let slower = false;
if(baseline){
  for(const name of Object.keys(curr)){
    if(baseline[name] !== undefined && curr[name] > baseline[name]){
      console.warn(`Warning: ${name} slower (mean ${curr[name].toFixed(2)} ms > ${baseline[name].toFixed(2)} ms)`);
      slower = true;
    }
  }
}
if(!slower){
  fs.copyFileSync(latestPath, baselinePath);
}
