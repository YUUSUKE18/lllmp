import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const parts = input.split(',');
const numbers: Set<number> = new Set<string>();

for (const part of parts) {
  const num = parseInt(part.trim(), 10);
  if (!isNaN(num)) {
    numbers.add(String(num));
  }
}

if (numbers.size === 0) process.exit(0);

let count: bigint;
let sum: number;

for (const str of Array.from(numbers).sort()) {
  const n = parseInt(str, 10);
  if (!isNaN(n)) {
    count += BigInt(n);
    sum += n;
  } else {
    continue;
  }
}

console.log(`count=${Number(count)} sum=${sum}`);
