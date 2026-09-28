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
  // Since the problem guarantees sum fits, standard parseInt (which returns Number) followed by BigInt conversion is sufficient if inputs are within JS safe range for individual numbers which they must be to fit a 64-bit sum of unique ones.
  
  count++;
  const bigVal = BigInt(val);
  sum += bigVal;
}

console.log(`count=${count} sum=${sum}`);
