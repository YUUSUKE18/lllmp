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

const uniqueNumbers = new Set(numbers.map(Number)); // Ensure they are actually Numbers for sum safety
let count: bigint;
let sum: number;

// Calculate distinct count and sum using BigInt to prevent overflow before final check, though spec says result fits in 64-bit.
count = BigInt(uniqueNumbers.size);
sum = uniqueNumbers.reduce((acc, val) => acc + (val as number), 0n) as number; // Cast back assuming it fits

console.log(`count=${Number(count)} sum=${sum}`);
