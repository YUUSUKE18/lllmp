import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers = new Set<number>();

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;
  const num = parseInt(trimmed, 10);
  if (!isNaN(num)) {
    numbers.add(num);
  }
}

let count = numbers.size;
let sum = 0n;
for (const n of numbers) {
  sum += BigInt(n);
}

console.log(`count=${count} sum=${sum}`);
