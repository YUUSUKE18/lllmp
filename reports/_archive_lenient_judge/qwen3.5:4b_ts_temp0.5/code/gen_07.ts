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

const uniqueNumbers = [...new Set(numbers)];
const count = uniqueNumbers.length;
let sum = 0n; // Use BigInt to ensure safety, though spec says it fits in 64-bit int.
for (const n of uniqueNumbers) {
  sum += BigInt(n);
}

console.log(`count=${count} sum=${Number(sum)}`);
