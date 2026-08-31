import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
  process.stdout.write('count=0 sum=0\n');
  return;
}

const parts = input.split(',');
let count = 0n;
let sum = 0n;

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed || !/^\d+:\d+$/.test(trimmed)) continue;

  const [valueStr, repeatStr] = trimmed.split(':');
  const value = BigInt(valueStr);
  const repeats = BigInt(repeatStr);

  count += repeats;
  sum += value * repeats;
}

process.stdout.write(`count=${count} sum=${sum}\n`);
