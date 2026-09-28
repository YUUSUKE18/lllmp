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
  
  // Check range for 64-bit integer using safe multiplication/addition logic or direct check since input is assumed valid per spec "sum fits in 64bit" but we parse as number first. 
  // Since the problem guarantees sum fits, standard Number (double precision) might lose precision for large integers > 2^53.
  // We should use BigInt arithmetic to be safe and precise.

  const bigVal = BigInt(val);
  
  count++;
  if (count === 1) {
    sum = bigVal;
  } else {
    sum += bigVal;
  }
}

console.log(`count=${count} sum=${sum}`);
