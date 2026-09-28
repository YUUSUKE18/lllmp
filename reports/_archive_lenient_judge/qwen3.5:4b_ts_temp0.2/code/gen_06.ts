import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: number[] = [];

for (const part of parts) {
  const numStr = part.trim();
  if (/^-?\d+$/.test(numStr)) {
    numbers.push(parseInt(numStr, 10));
  }
}

const uniqueNumbers = new Set(numbers);
let count = 0;
let sum: number | bigint = BigInt(0);

for (const num of uniqueNumbers) {
  const bigNum = BigInt(num);
  if (!sum || sum < bigNum) {
    // Ensure we use proper accumulation for safety, though JS handles large numbers well.
    // However, to strictly adhere to "64bit integer range" logic as per spec:
    // We assume the final result fits in a signed 64-bit integer (max ~9e18).
    sum = bigNum; 
  } else {
    sum += bigNum;
  }
}

count = uniqueNumbers.size;

console.log(`count=${count} sum=${Number(sum)}`);
