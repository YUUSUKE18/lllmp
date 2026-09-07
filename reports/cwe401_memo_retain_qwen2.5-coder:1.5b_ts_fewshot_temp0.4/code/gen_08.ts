import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);
let memo = new Map<number, number>();

const total = data.reduce((acc, n) => {
  const num = parseInt(n, 10);
  if (num === 1) return acc;
  if (memo.has(num)) return acc + memo.get(num);
  const next = num % 2 === 0 ? num / 2 : 3 * num + 1;
  memo.set(num, next);
  return acc + next;
}, 0);

console.log(`total=${total}`);
