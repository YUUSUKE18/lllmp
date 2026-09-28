import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n').filter(line => line.length > 0);

const regex = /^\s*(\d+(?:,\d+)*)?\s*$/;

let validCount = 0;
for (const line of lines) {
  if (regex.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
