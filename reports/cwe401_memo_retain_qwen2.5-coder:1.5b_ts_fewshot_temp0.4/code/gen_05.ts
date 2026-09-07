import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8');
let memo = new Map<number, number>();

function collatzSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? collatzSteps(n / 2) + 1 : collatzSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;
for (const line of input.split('\n')) {
  if (line.trim() === '') continue;
  const n = parseInt(line, 10);
  if (Number.isNaN(n)) continue;
  totalSteps += collatzSteps(n);
}

console.log(`total=${totalSteps}`);
