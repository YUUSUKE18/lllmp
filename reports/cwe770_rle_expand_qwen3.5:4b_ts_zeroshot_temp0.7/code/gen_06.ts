import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
if (!input) {
  console.log('count=0 sum=0\n');
  process.exit(0);
}

const lines = input.split('\n');
let count = 0;
let sum = BigInt(0);

for (const line of lines) {
  const parts = line.split(',').filter(p => p.trim() !== '');
  for (const part of parts) {
    if (!part.includes(':')) continue;
    const [valueStr, countStr] = part.split(':');
    const value = parseInt(valueStr.trim(), 10);
    const cnt = parseInt(countStr.trim(), 10);
    if (cnt < 0 || isNaN(value) || isNaN(cnt)) continue;
    for (let i = 0; i < cnt; i++) {
      count++;
      sum += BigInt(value);
    }
  }
}

console.log(`count=${Number(count)} sum=${BigInt(sum).toString()}\n`);
