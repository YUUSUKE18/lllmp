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

const uniqueNumbers = new Set<number>(numbers);
let count = uniqueNumbers.size;
let sum = 0n; // BigInt for safety with large sums

for (const num of uniqueNumbers) {
  if (!Number.isFinite(num)) continue;
  const bigNum = BigInt(Math.abs(Number(num)));
  if (num < 0 && !bigNum.toString().startsWith('-')) {
    sum -= bigNum;
  } else {
    sum += bigNum;
  }
}

console.log(`count=${count} sum=${Number(sum)}`);
