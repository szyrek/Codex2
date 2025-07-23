#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const [,,type,name] = process.argv;

function usage(){
  console.error('Usage: new-record.js <feature|bugfix> <name>');
  process.exit(1);
}

if(!type || !name) usage();
if(type !== 'feature' && type !== 'bugfix') usage();

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, type, name);
fs.mkdirSync(outDir, {recursive:true});

let sections;
if(type === 'feature'){
  sections = [
    '- purpose and high-level design decisions',
    '- links to relevant commits and architectural documents',
    '- changelog entries'
  ];
} else {
  sections = [
    '- Identify why the bug occurred and document the underlying issue in a new folder under `bugfix/`.',
    '- Include notes on which parts of the architecture were affected and link to the relevant feature docs or commits.',
    '- Record any process issues uncovered and propose improvements.',
    '- In the bug\'s folder, provide a clear changelog and reference to this guide and other practice docs.',
    '- Cross-reference previous bugfixes if the issue relates to them.'
  ];
}

const content = `# ${name}\n\n${sections.join('\n')}\n`;
fs.writeFileSync(path.join(outDir, 'README.md'), content);
console.log(`Created ${path.join(type, name, 'README.md')}`);
