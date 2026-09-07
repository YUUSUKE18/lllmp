import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf-8');
const queries = input.split('\n').filter(Boolean);

const memo: Record<number, number> = {};

function computeSteps(n: number): number {
  if (memo[n] !== undefined) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + computeSteps(n / 2);
  return 1 + computeSteps(3 * n + 1);
}

let totalSteps = 0;

for (const query of queries) {
  const n = parseInt(query, 10);
  if (isNaN(n) || n <= 0) continue;
  totalSteps += computeSteps(n);
}

console.log(`total=${totalSteps}`);
