import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean);

const memo = new Map<number, number>();

function getSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + getSteps(n / 2);
  return 1 + getSteps(3 * n + 1);
}

let totalSteps = 0;

for (const n of data) {
  const steps = getSteps(parseInt(n, 10));
  totalSteps += steps;
}

console.log(`total=${totalSteps}`);
