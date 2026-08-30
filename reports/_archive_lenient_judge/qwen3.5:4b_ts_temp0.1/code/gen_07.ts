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
  
  // Check range for 64-bit integer using safe multiplication/addition logic or direct check
  // Since input is assumed to be within valid JS number range but we need BigInt sum safety.
  // We'll accumulate into a BigInt directly as the spec guarantees final result fits in 64bit int, 
  // so intermediate sums won't overflow standard JS Number precision if handled carefully via BigInt.
  
  const bigVal = BigInt(val);
  count++;
  sum += bigVal;
}

console.log(`count=${count} sum=${sum}`);
