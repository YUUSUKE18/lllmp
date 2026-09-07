import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const queries = input.split('\n').filter(Boolean);

let memo = new Map<number, number>();

const solve = (n: number): number => {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  memo.set(n, 1 + solve(next));
  return memo.get(n)!;
};

let total = 0;
for (const query of queries) {
  const n = parseInt(query, 10);
  if (n > 0) total += solve(n);
}

console.log(`total=${total}`);
