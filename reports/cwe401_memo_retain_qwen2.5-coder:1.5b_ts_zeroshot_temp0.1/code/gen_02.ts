import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

const memo: Record<number, number> = {};

function calculateSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const steps = n % 2 === 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
  memo[n] = steps;
  return steps;
}

let totalSteps = 0;

for (const query of input) {
  const n = parseInt(query, 10);
  totalSteps += calculateSteps(n);
}

console.log(`total=${totalSteps}`);
