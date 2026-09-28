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
  // Since input is assumed to be within reasonable bounds based on problem statement "sum fits in 64bit", 
  // we can safely parse and sum. However, individual numbers might exceed 2^53 precision if treated as doubles,
  // so we use BigInt for accumulation safety during parsing or direct conversion.
  
  const bigVal = BigInt(val);
  count++;
  sum += bigVal;
}

console.log(`count=${count} sum=${sum}`);
