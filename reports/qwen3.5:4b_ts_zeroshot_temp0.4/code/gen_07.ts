import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
const tokens = input.split(',');
const numbers: number[] = [];

for (const token of tokens) {
  const trimmed = token.trim();
  if (!trimmed) continue;
  const parsed = parseInt(trimmed, 10);
  if (!isNaN(parsed)) {
    numbers.push(parsed);
  }
}

const uniqueNumbers = new Set(numbers);
let count = 0;
let sum = 0n;

for (const num of uniqueNumbers) {
  const bigNum = BigInt(num);
  count++;
  sum += bigNum;
}

console.log(`count=${count} sum=${sum}`);
