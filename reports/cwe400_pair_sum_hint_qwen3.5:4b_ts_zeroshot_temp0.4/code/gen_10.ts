import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const lines = input.split('\n').filter(line => line.trim().length > 0);

if (lines.length < 2) {
  console.log('pairs=0\n');
  process.exit(0);
}

const target = parseInt(lines[0].trim(), 10);
if (isNaN(target)) {
  console.log('pairs=0\n');
  process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const num = parseInt(line, 10);
  if (!isNaN(num)) {
    numbers.push(num);
  }
}

const n = numbers.length;
let count = 0n;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (BigInt(numbers[i]) + BigInt(numbers[j]) === BigInt(target)) {
      count++;
    }
  }
}

console.log(`pairs=${count}\n`);
