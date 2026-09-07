import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

let memo = new Map<number, number>();
let total = 0;

for (const query of input) {
  let n = parseInt(query, 10);
  let steps = 0;

  while (n !== 1) {
    steps++;
    if (memo.has(n)) {
      steps += memo.get(n);
      break;
    }
    memo.set(n, steps);

    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }

  total += steps;
}

console.log(`total=${total}`);
