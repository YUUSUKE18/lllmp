import { strict as assert } from 'assert';

const memo: Record<number, number> = {};
const MAX = 2 ** 63 - 1;

function calculateSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
  memo[n] = 1 + calculateSteps(nextN);
  return memo[n];
}

const total = [...process.stdin]
  .split('\n')
  .filter(line => /^\d+$/.test(line))
  .reduce((acc, line) => acc + calculateSteps(parseInt(line, 10)), 0);

console.log(`total=${total}`);
