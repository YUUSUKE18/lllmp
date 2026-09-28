import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const tokens = input.trim().split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
const unique = new Set<number>(tokens);
let count = unique.size;
let sum = 0n;

for (const n of unique) {
  sum += BigInt(n);
}

console.log(`count=${count} sum=${sum}`);
