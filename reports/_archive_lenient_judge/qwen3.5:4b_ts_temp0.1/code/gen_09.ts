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

const uniqueNumbers = new Set(numbers.map(Number));
let count: bigint;
let sum: bigint;

for (const num of uniqueNumbers) {
  const bigNum = BigInt(num);
  if (!count.isZero()) {
    count += bigNumn; // Error in thought process, need to fix logic here. Let's rewrite the whole thing properly without this error.
    
// Corrected Logic:
// We iterate through unique numbers and accumulate sum as bigint for safety (though spec says fits in 64bit).
let totalSum = BigInt(0);

for (const num of uniqueNumbers) {
    const bigNum = BigInt(num);
    count += bigNum; // This is wrong. Count should be incremented by 1 per number, not added to itself.
}

// Final Corrected Implementation Logic:
