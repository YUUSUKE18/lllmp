import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n');

let total = 0;
const memo = new Map<number, number>();

for (const line of input) {
  if (line.trim() === '') continue;

  const n = parseInt(line, 10);
  if (n === 1) {
    total += 0;
    continue;
  }

  if (memo.has(n)) {
    total += memo.get(n);
    continue;
  }

  let count = 0;
  while (n !== 1) {
    count++;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }

  total += count;
  memo.set(n, count);
}

console.log(`total=${total}`);
