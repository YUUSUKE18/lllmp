import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');
const queries = input.split('\n').filter(Boolean).map(Number);

const memo: { [key: number]: number } = {};

function calculateSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const steps = n % 2 === 0 ? calculateSteps(n / 2) : calculateSteps(3 * n + 1);
  memo[n] = steps + 1;
  return steps + 1;
}

const totalSteps = queries.reduce((acc, n) => acc + calculateSteps(n), 0);

console.log(`total=${totalSteps}`);
