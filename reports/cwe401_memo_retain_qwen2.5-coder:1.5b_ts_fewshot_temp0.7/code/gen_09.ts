import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);

const memo: Record<number, number> = {};

const getTotalSteps = (n: number): number => {
  if (memo[n] !== undefined) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) return memo[n] = getTotalSteps(n / 2) + 1;
  return memo[n] = getTotalSteps(3 * n + 1) + 1;
};

const totalSteps = input.reduce((acc, n) => acc + getTotalSteps(parseInt(n, 10)), 0);

console.log(`total=${totalSteps}`);
