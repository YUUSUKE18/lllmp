import { readFileSync } from 'fs';

const data: string[] = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

let memo: { [key: number]: number } = {};
let total = 0;

for (const query of data) {
  let n = parseInt(query, 10);
  while (n !== 1) {
    if (n in memo) {
      total += memo[n];
      break;
    }
    memo[n] = memo[n] || 0;
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    total++;
  }
  total++;
}

console.log(`total=${total}`);
