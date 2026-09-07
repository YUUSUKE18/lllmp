import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8').trim();
const target = parseInt(input, 10);

const numbers = new Set<number>();
const count = 0;

for (const line of input.split('\n').slice(1)) {
  const num = parseInt(line, 10);
  if (num === target) {
    continue;
  }
  if (numbers.has(target - num)) {
    count++;
  }
  numbers.add(num);
}

console.log(`pairs=${count}`);
