import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').trim();
const queries = input.split('\n').filter(Boolean);

const memo: Record<number, number> = {};

const solve = (n: number): number => {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  memo[n] = 1 + solve(next);
  return memo[n];
};

let total = 0;
for (const query of queries) {
  const n = parseInt(query, 10);
  if (n === 1) continue;
  total += solve(n);
}

console.log(`total=${total}`);
