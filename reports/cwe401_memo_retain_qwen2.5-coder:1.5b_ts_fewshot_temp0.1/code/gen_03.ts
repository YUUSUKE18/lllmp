import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const numbers = input.split('\n').filter(line => line.trim() !== '');

let memo = new Map<number, number>();
let total = 0;

for (const num of numbers) {
  let current = parseInt(num, 10);
  let steps = 0;

  while (current !== 1) {
    if (memo.has(current)) {
      steps += memo.get(current);
      break;
    }
    memo.set(current, steps);
    steps++;

    if (current % 2 === 0) {
      current /= 2;
    } else {
      current = 3 * current + 1;
    }
  }

  total += steps;
}

console.log(`total=${total}`);
