import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const numbers: number[] = [];
for (const token of input.split(',')) {
  const num = parseInt(token.trim(), 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

const uniqueNumbers = new Set(numbers);
let count = 0;
let sum: bigint = BigInt(0);

for (const n of uniqueNumbers) {
  const bigN = BigInt(n);
  count++;
  sum += bigN;
}

console.log(`count=${count} sum=${sum}`);
