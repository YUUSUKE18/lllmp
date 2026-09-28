import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const lines = input.trim().split('\n');

const regex = /^\s*(\d+(?:,\d+)*)?\s*$/;
let validCount = 0;

for (const line of lines) {
  if (regex.test(line)) {
    validCount++;
  }
}

console.log(`valid=${validCount}`);
