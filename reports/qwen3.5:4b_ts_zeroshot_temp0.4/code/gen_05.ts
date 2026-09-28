import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();
if (!input) {
  console.log('count=0 sum=0');
  process.exit(0);
}

const parts = input.split(',').map(s => s.trim()).filter(s => s !== '');
const numbers = new Set<number>();
let sum = 0n;

for (const s of parts) {
  const num = parseInt(s, 10);
  if (!isNaN(num)) {
    numbers.add(num);
    sum += BigInt(num);
  }
}

console.log(`count=${numbers.size} sum=${sum}`);
