import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts: number[] = [];
for (const token of input.split(',')) {
  const num = Number(token.trim());
  if (!isNaN(num) && !isFinite(num)) {
    parts.push(Math.round(num));
  }
}

const uniqueSet = new Set<number>();
parts.forEach(n => uniqueSet.add(n));

let count = 0;
let sum: bigint = 0n;
for (const n of uniqueSet) {
  if (!Number.isInteger(n)) continue;
  const bigN = BigInt(Math.floor(Number(n))); // Ensure it fits in integer range for safety logic, though input implies int.
  count++;
  sum += bigN;
}

console.log(`count=${count} sum=${sum.toString()}`);
