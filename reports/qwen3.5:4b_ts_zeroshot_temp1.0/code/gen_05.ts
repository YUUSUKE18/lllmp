import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const tokens = input.split(',').map(s => parseInt(s.trim(), 10));

const seen = new Set<number>();
let count = 0;
let sum = BigInt(0);

for (const t of tokens) {
  if (!Number.isFinite(t)) continue;
  if (seen.has(t)) continue;
  seen.add(t);
  count++;
  sum += BigInt(t);
}

console.log(`count=${count} sum=${sum.toString()}\n`);
