import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const lines = input.split('\n').filter(Boolean);

let memo: { [key: number]: number } = {};
let total = 0;

for (const line of lines) {
  const n = parseInt(line, 10);
  if (n === 1) continue;

  if (memo[n] !== undefined) {
    total += memo[n];
    continue;
  }

  let count = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    count++;
  }

  total += count;
  memo[n] = count;
}

console.log(`total=${total}`);
