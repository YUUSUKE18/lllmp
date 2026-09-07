import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').trim().split('\n');
const target = parseInt(data[0], 10);
const pairs = 0;

for (let i = 1; i < data.length; i++) {
  const num = parseInt(data[i], 10);
  if (Number.isNaN(num)) continue;
  if (target - num >= 0) {
    pairs += 1;
    target -= num;
  }
}

console.log(`pairs=${pairs}`);
