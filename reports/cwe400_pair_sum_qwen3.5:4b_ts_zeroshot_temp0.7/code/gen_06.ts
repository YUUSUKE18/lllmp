import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) process.exit(0);

const lines = input.split('\n');
let target: bigint = BigInt(lines[0].trim());

const numbers: Set<number> = new Set();
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const num = parseInt(line, 10);
  if (isNaN(num)) continue;
  numbers.add(num);
}

if (numbers.size < 2) {
  console.log(`pairs=0`);
  process.exit(0);
}

const sorted = Array.from(numbers).sort((a, b) => a - b);
let count = 0n;

for (let i = 0; i < sorted.length; i++) {
  for (let j = i + 1; j < sorted.length; j++) {
    const sum = BigInt(sorted[i]) + BigInt(sorted[j]);
    if (sum === target) {
      count++;
    }
  }
}

console.log(`pairs=${count}`);
