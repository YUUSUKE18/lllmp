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
  
  // Check range for safe conversion to number then back or use direct parsing with checks
  // Since input is integer and sum fits in 64-bit int, we can safely parse as Number first.
  const num = val; 
  
  count++;
  if (sum < BigInt(Number.MAX_SAFE_INTEGER) && sum > -BigInt(Number.MIN_SAFE_INTEGER)) {
    sum += BigInt(num);
  } else {
    // Fallback for edge cases where intermediate calculation might overflow before assignment, 
    // though problem guarantees final result fits. We accumulate safely using BigInt logic if needed.
    // Actually simpler: just add to a running total as number since it's guaranteed to fit in 64-bit int range at the end?
    // Wait, "合計は 64bit 整数の範囲に収まります" means final sum fits. 
    // Intermediate sums during accumulation might technically exceed if we were doing something weird, but here we just add positive/negative numbers.
    // To be absolutely safe with BigInt:
    const bigVal = BigInt(num);
    sum += bigVal;
  }
}

console.log(`count=${count} sum=${Number(sum)}`);
