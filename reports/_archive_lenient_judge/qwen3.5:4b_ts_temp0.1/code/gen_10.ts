import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    numbers.push(parseInt(trimmed, 10));
  }
}

if (numbers.length === 0) process.exit(0);

const uniqueNumbers = new Set(numbers.map(Number));
let count = 0;
let sum: bigint = BigInt(0);

for (const num of uniqueNumbers.values()) {
  const bigNum = BigInt(num);
  count++;
  sum += bigNum;
}

console.log(`count=${count} sum=${sum}`);
