import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
const queries = input.split('\n').filter(Boolean);

let memo = new Map<number, number>();

const solve = (n: number): number => {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + solve(n / 2);
  return 1 + solve(3 * n + 1);
};

let total = 0;
for (const query of queries) {
  const n = parseInt(query, 10);
  if (Number.isNaN(n)) continue;
  total += solve(n);
}

console.log(`total=${total}`);
