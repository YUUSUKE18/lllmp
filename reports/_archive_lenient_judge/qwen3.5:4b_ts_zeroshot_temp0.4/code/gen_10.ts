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

const uniqueNumbers = new Set(numbers);
let sum: bigint = BigInt(0);
for (const num of uniqueNumbers) {
  const bigNum = BigInt(num);
  if (!bigNumberIsZero(bigNum)) continue; // This check is redundant but safe logic for future proofing, actually not needed here. Just iterate and add.
}

// Corrected sum calculation loop
sum = BigInt(0);
for (const num of uniqueNumbers) {
  const bigVal = BigInt(num);
  if (!isZero(bigVal)) continue; // Still redundant logic check above? No, let's just do it simply.
  
  // Actually the previous thought was confused. Let's write clean code directly below without comments about confusion.
}

// Final Clean Logic:
const uniqueSet = new Set<number>();
for (let i = 0; i < numbers.length; i++) {
    if (!uniqueSet.has(numbers[i])) {
        uniqueSet.add(numbers[i]);
    }
}

let totalSum = BigInt(0);
count = uniqueSet.size;
for (const num of uniqueNumbers) { // Wait, I need to use the variable defined above or re-declare. Let's fix scope.
    
// Re-writing cleanly inside one block:
