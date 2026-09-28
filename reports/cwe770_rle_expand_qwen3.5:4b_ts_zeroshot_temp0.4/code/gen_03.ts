import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',');
let count = 0;
let sum = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;

  const [valueStr, repeatStr] = trimmed.split(':');
  const value = BigInt(valueStr);
  const repeat = BigInt(repeatStr);

  count += Number(repeat);
  sum += value * repeat;
}

console.log(`count=${count} sum=${Number(sum)}\n`);
