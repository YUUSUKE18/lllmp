import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
let sum = BigInt(0);

for (const line of input) {
  if (!line.trim()) continue;
  
  const parts = line.split(/\s+/);
  for (const part of parts) {
    const val = BigInt(part);
    if (!isNaN(val)) {
      count++;
      sum += val;
    }
  }
}

console.log(`count=${count} sum=${sum}`);
