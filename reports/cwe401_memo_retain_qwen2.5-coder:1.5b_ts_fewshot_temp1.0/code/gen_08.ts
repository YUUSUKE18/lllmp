import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin').toString().trim();
const queries = input.split('\n').map(Number);

let memo = new Map<number, number>();
let total = 0;

for (const query of queries) {
  if (memo.has(query)) {
    total += memo.get(query);
    continue;
  }
  let steps = 0;
  let n = query;
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    steps++;
  }
  memo.set(query, steps);
  total += steps;
}

console.log(`total=${total}`);
