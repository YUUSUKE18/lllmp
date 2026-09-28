import { readFileSync } from 'fs';

const data = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);
let memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;
for (const line of data) {
  const n = parseInt(line, 10);
  if (n % 2 === 0) {
    totalSteps += calculateSteps(n / 2);
  } else {
    totalSteps += calculateSteps(3 * n + 1);
  }
}

console.log(`total=${totalSteps}`);
