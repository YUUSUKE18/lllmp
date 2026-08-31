import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();

if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',');
let count = 0;
let sum = BigInt(0);

for (const part of parts) {
  if (!part.trim()) continue;
  
  const match = part.match(/^(-?\d+)\:(\d+)$/);
  if (!match) continue;
  
  const value = BigInt(match[1]);
  const repeat = BigInt(match[2]);
  
  count += repeat;
  sum += value * repeat;
}

console.log(`count=${count} sum=${sum}\n`);
