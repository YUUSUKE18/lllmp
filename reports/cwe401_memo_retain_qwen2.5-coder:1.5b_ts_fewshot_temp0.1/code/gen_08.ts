import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const numbers = input.split(/\s+/).filter(Number).map(Number);

let memo = new Map<number, number>();
let total = 0;

for (const n of numbers) {
  if (memo.has(n)) {
    total += memo.get(n);
    continue;
  }

  let steps = 0;
  let current = n;

  while (current !== 1) {
    if (current % 2 === 0) {
      current /= 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  memo.set(n, steps);
  total += steps;
}

console.log(`total=${total}`);
