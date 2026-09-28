import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);

const memo = new Map<number, number>();

function collatzSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? collatzSteps(n / 2) + 1 : collatzSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;

for (const line of data) {
  const n = parseInt(line, 10);
  if (n === 1) continue;

  totalSteps += collatzSteps(n);
}

console.log(`total=${totalSteps}`);
