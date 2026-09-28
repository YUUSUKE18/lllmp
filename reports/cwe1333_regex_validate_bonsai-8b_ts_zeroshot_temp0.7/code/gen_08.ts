import { readLines, Line } from 'readline';

const rl = readLines(process.stdin);
const validLines = [];

for (const line of rl) {
  line = line.trim();
  if (line === '') continue;

  const parts = line.split(',');
  if (parts.length < 2) continue;

  if (parts.every(part => /^\d+$/.test(part))) {
    validLines.push(line);
  }
}

console.log(`valid=${validLines.length}`);
