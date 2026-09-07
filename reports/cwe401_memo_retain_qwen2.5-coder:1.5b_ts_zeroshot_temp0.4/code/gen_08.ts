import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);

let memo: Record<number, number> = {};
let total = 0;

for (const query of input) {
  let n = parseInt(query, 10);
  if (n === 1) {
    total += 0;
    continue;
  }

  let count = 0;
  while (n !== 1) {
    if (memo[n]) {
      count += memo[n];
      break;
    }
    memo[n] = count + 1;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }

  total += count;
}

console.log(`total=${total}`);
