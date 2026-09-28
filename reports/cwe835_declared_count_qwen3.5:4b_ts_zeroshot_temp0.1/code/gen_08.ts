import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
let sum = BigInt(0);

for (const line of input) {
  if (!line.trim()) continue;
  
  const parts = line.split(/\s+/);
  for (const part of parts) {
    const num = BigInt(part);
    if (num >= 0n && num <= Number.MAX_SAFE_INTEGER * 2n) { // Basic check, though spec says 64bit range
      count++;
      sum += num;
    }
  }
}

console.log(`count=${count} sum=${sum}`);
