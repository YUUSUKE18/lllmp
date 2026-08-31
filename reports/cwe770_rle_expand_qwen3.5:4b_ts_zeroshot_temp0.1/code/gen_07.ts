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
  if (!trimmed.match(/^-?\d+:$/)) continue;
  
  const [valueStr, repeatStr] = trimmed.split(':');
  const value = BigInt(valueStr);
  const repeat = BigInt(repeatStr);

  if (repeat < 0n) continue;

  count += Number(repeat);
  sum += value * repeat;
}

console.log(`count=${count} sum=${sum}\n`);
