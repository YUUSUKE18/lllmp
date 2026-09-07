import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);

const memo: Record<number, number> = {};

function countSteps(n: number): number {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) {
    memo[n] = 1 + countSteps(n / 2);
  } else {
    memo[n] = 1 + countSteps(3 * n + 1);
  }
  return memo[n];
}

let totalSteps = 0;
for (const n of data) {
  const steps = countSteps(parseInt(n, 10));
  totalSteps += steps;
}

console.log(`total=${totalSteps}`);
