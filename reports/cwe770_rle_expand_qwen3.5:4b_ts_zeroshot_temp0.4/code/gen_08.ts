import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',');
let totalSum = BigInt(0);
let totalCount = BigInt(0);

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;

  const [valueStr, countStr] = trimmed.split(':');
  const value = BigInt(valueStr);
  const count = BigInt(countStr);

  totalCount += count;
  totalSum += value * count;
}

console.log(`count=${totalCount} sum=${totalSum}\n`);
