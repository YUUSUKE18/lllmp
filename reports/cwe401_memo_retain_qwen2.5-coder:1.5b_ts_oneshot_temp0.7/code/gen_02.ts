import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf-8').trim();
const numbers = input.split('\n').filter(line => /^[0-9]+$/.test(line)).map(Number);

const memo = new Map<number, number>();

function collatzSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? collatzSteps(n / 2) + 1 : collatzSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

const totalSteps = numbers.reduce((acc, num) => acc + collatzSteps(num), 0);

console.log(`total=${totalSteps}`);
