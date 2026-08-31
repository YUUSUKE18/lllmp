import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8');
const lines = input.split('\n');
let count = 0;
let sum: bigint = 0n;

for (const line of lines) {
  if (!line.trim()) continue;
  
  const parts = line.split(/\s+/);
  for (const part of parts) {
    const num = BigInt(part);
    if (num >= 0n) {
      sum += num;
      count++;
    }
  }
}

console.log(`count=${count} sum=${sum}`);
