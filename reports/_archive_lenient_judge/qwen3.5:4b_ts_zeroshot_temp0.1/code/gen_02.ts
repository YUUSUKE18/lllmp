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
  
  // Check for overflow before adding to ensure safety within 64-bit range logic conceptually, 
  // though the problem guarantees sum fits in 64-bit integer.
  count++;
  const currentSum = (sum + BigInt(val));
  if (!Number.isFinite(Number(currentSum))) {
    console.log(`count=${count} sum=`);
    process.exit(0);
  }
  sum = currentSum;
}

console.log(`count=${count} sum=${Number(sum)}`);
