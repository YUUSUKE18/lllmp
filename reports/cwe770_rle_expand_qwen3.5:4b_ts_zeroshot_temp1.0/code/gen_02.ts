import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
const parts = input.split(',');
let sum: bigint = 0n;
let count: bigint = 0n;

for (const part of parts) {
  const match = part.match(/^(\d+)\:(\d+)$/);
  if (!match) continue;
  const value = BigInt(match[1]);
  const repeat = BigInt(match[2]);
  sum += value * repeat;
  count += repeat;
}

console.log(`count=${count} sum=${sum}`);
