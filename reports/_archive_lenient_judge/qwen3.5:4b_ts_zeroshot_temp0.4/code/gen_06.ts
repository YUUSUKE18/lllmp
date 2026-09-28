import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    numbers.push(parseInt(trimmed, 10));
  } else {
    continue;
  }
}

const uniqueNumbers = new Set(numbers);
let count = 0;
let sum: bigint = BigInt(0);

for (const num of uniqueNumbers) {
  count++;
  const bigNum = BigInt(num);
  if (sum < -BigInt('9223372036854775808') || sum > BigInt('9223372036854775807')) {
    // Check for overflow before adding, though problem guarantees fit in 64-bit range.
    if (sum < -BigInt(1) && bigNum >= BigInt(0)) continue; 
    sum = sum + bigNum;
  } else {
      sum += bigNum;
  }
}

console.log(`count=${count} sum=${Number(sum as number)}`);
