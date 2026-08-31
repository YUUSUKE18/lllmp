import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
const lines = input.split('\n');
let count = 0n;
let sum = 0n;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  
  // "値:回数" の形式を検出
  const match = trimmed.match(/^(\d+)\s*:\s*(\d+)$/);
  if (!match) continue;

  const value = BigInt(match[1]);
  const repeat = BigInt(match[2]);

  count += repeat;
  sum += value * repeat;
}

console.log(`count=${count} sum=${sum}`);
