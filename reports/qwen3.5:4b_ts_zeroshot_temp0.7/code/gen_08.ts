import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8').trim();
if (!input) process.exit(0);

const tokens = input.split(/\s+/);
const uniqueIntegers = new Set<number>();

for (const token of tokens) {
  const num = parseInt(token, 10);
  if (!isNaN(num)) {
    uniqueIntegers.add(num);
  }
}

let sum: number = 0;
for (const n of uniqueIntegers) {
  sum += n;
}

console.log(`count=${uniqueIntegers.size} sum=${sum}`);
