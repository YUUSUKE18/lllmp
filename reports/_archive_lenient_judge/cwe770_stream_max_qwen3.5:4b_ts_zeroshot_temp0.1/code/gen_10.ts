import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
let max: bigint | undefined;
for (const part of parts) {
  const trimmed = part.trim();
  if (/^-?\d+$/.test(trimmed)) {
    const val = BigInt(Number.parseInt(trimmed, 10));
    count++;
    if (!max || val > max) max = val;
  } else {
    continue;
  }
}

console.log(`count=${count} max=${max}`);
