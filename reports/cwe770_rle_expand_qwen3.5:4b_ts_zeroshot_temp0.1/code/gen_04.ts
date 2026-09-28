import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const parts = input.split(',').map(s => s.trim()).filter(s => s !== '');
let count = 0;
let sum = 0n;

for (const part of parts) {
  const match = part.match(/^(\d+)\:(\d+)$/);
  if (!match) continue;
  
  const value = BigInt(match[1]);
  const repeat = BigInt(match[2]);
  
  count += repeat;
  sum += value * repeat;
}

console.log(`count=${Number(count)} sum=${Number(sum)}\n`);
