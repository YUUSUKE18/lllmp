import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log('count=0 sum=0');
  process.exit(0);
}

const parts = input.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));

const uniqueSet = new Set<number>();
for (const n of parts) {
  uniqueSet.add(n);
}

let count = 0;
let sum = 0n;
for (const n of uniqueSet) {
  count++;
  sum += BigInt(n);
}

console.log(`count=${count} sum=${sum}`);
