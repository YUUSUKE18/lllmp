import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',').map((s) => s.trim()).filter(Boolean);
let count = 0;
let sum = BigInt(0);

for (const part of parts) {
  const match = part.match(/^(\d+)\:(\d+)$/);
  if (!match) continue;
  
  const value = BigInt(match[1]);
  const repeat = BigInt(match[2]);
  
  count += repeat;
  sum += value * repeat;
}

console.log(`count=${Number(count)} sum=${Number(sum)}\n`);
