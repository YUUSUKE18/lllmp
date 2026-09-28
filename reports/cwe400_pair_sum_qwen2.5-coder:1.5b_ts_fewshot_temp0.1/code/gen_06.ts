import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const lines = input.split('\n').filter(Boolean);

let pairs = 0;
let target = parseInt(lines[0], 10);

for (let i = 1; i < lines.length; i++) {
  const num = parseInt(lines[i], 10);
  if (Number.isNaN(num)) continue;
  if (target - num in lines) {
    pairs++;
  }
}

console.log(`pairs=${pairs}`);
