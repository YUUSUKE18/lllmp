import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').trim();
const numbers = input.split(/\s+/).filter(Number).map(Number);

const memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

const totalSteps = numbers.reduce((acc, n) => acc + calculateSteps(n), 0);

console.log(`total=${totalSteps}`);
