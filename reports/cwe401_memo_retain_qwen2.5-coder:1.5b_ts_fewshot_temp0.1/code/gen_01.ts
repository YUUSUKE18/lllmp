import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const queries = input.split('\n').filter(Boolean);

let memo = new Map<number, number>();
let total = 0;

for (const query of queries) {
  let n = parseInt(query, 10);
  if (n === 1) {
    total += 0;
  } else if (memo.has(n)) {
    total += memo.get(n);
  } else {
    let steps = 0;
    while (n !== 1) {
      steps++;
      if (n % 2 === 0) {
        n /= 2;
      } else {
        n = 3 * n + 1;
      }
    }
    memo.set(n, steps);
    total += steps;
  }
}

console.log(`total=${total}`);
