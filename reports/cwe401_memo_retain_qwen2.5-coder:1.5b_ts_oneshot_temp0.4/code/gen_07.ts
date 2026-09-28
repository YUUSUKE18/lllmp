import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').trim();
const queries = input.split('\n').filter(Boolean);

const memo: Record<number, number> = {};

function calculateSteps(n: number): number {
  if (memo[n] !== undefined) return memo[n];

  if (n === 1) return 0;

  if (n % 2 === 0) {
    memo[n] = 1 + calculateSteps(n / 2);
  } else {
    memo[n] = 1 + calculateSteps(3 * n + 1);
  }

  return memo[n];
}

let totalSteps = 0;

for (const query of queries) {
  const n = parseInt(query, 10);
  if (isNaN(n)) continue;

  totalSteps += calculateSteps(n);
}

console.log(`total=${totalSteps}`);
