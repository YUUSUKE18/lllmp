import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');

const regex = /^\s*([0-9]+(?:\s*,\s*[0-9]+)*)?\s*$/;

let validCount = 0;

for (const line of input.split('\n')) {
  if (regex.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
