import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
if (!input) process.exit(0);

const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
const unique = new Set(parts);

let count = 0;
let sum = 0n;

for (const n of unique) {
  const bigN = BigInt(n);
  count++;
  sum += bigN;
}

console.log(`count=${count} sum=${sum}`);
