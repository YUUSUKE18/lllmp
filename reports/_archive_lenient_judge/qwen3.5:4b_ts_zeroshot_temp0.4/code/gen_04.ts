import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const numStr = part.trim();
  if (/^-?\d+$/.test(numStr)) {
    numbers.push(parseInt(numStr, 10));
  }
}

const uniqueNumbers = new Set(numbers);
let sum: bigint = BigInt(0);
for (const n of uniqueNumbers) {
  sum += BigInt(n);
}

console.log(`count=${uniqueNumbers.size} sum=${sum}`);
