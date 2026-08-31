import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',');
let count = 0;
let sum = BigInt(0);

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;

  const [valueStr, repeatStr] = trimmed.split(':');
  const value = Number(valueStr);
  const repeat = Number(repeatStr);

  if (isNaN(value) || isNaN(repeat) || repeat < 0) continue;

  count += repeat;
  sum += BigInt(value) * BigInt(repeat);
}

console.log(`count=${Number(count)} sum=${Number(sum)}\n`);
