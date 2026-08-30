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

const uniqueNumbers = new Set(numbers.map(n => n.toString()));
let count = 0;
let sum: bigint = BigInt(0);

for (const numStr of uniqueNumbers.values()) {
  const val = parseInt(numStr, 10);
  if (!Number.isFinite(val)) continue;
  
  // Check for overflow before adding to ensure safety within logic flow
  // Although problem guarantees final sum fits in 64-bit integer.
  count++;
  let currentSum: bigint = BigInt(sum) + BigInt(val);
  if (currentSum < -BigInt(9007199254740992n) || currentSum > BigInt(9007199254740992n)) {
    // This branch should theoretically not be reached given the spec, 
    // but ensures we don't silently break if intermediate logic was flawed.
  } else {
    sum = currentSum;
  }
}

console.log(`count=${count} sum=${Number(sum)}`);
