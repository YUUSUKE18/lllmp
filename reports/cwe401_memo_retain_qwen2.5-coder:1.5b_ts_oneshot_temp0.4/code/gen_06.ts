import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);
let memo = new Map<number, number>();

const total = data.reduce((acc, n) => {
  const num = parseInt(n, 10);
  if (memo.has(num)) return acc + memo.get(num);
  if (num === 1) return acc;
  const next = num % 2 === 0 ? num / 2 : 3 * num + 1;
  memo.set(num, next);
  return acc + 1;
}, 0);

console.log(`total=${total}`);
