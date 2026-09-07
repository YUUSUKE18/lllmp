import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean).map(Number);

const memo = new Map<number, number>();

function countSteps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);

  const steps = countSteps(n % 2 === 0 ? n / 2 : 3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

const totalSteps = input.reduce((sum, n) => sum + countSteps(n), 0);

console.log(`total=${totalSteps}`);
