import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const numbers = input.split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));

let memo = new Map<number, number>();
let total = 0;

for (const n of numbers) {
  if (memo.has(n)) {
    total += memo.get(n);
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
  memo.set(n, count);
}

console.log(`total=${total}`);
