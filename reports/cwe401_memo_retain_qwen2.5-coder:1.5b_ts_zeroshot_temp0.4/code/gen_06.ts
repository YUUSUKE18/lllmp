import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8').split('\n');

let memo: Record<number, number> = {};

function calculateSteps(n: number): number {
  if (n in memo) return memo[n];

  if (n === 1) return 0;

  memo[n] = 1 + (n % 2 === 0 ? calculateSteps(n / 2) : calculateSteps(3 * n + 1));
  return memo[n];
}

let totalSteps = 0;

for (const line of input) {
  const n = parseInt(line, 10);
  if (!isNaN(n)) {
    totalSteps += calculateSteps(n);
  }
}

console.log(`total=${totalSteps}`);
