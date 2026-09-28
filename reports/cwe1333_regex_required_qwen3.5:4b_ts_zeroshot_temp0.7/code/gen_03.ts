import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').split('\n');

const regex = /^(?:\s*\d+(?:,\s*\d+)*\s*)?$/;

let validCount = 0;

for (const line of input) {
  if (regex.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
