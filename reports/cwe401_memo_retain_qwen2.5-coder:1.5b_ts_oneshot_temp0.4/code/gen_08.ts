import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8');
const numbers = input.split(/\s+/).filter(n => !isNaN(parseInt(n, 10)));

const memo = new Map<number, number>();

function countSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  if (n % 2 === 0) {
    memo.set(n, 1 + countSteps(n / 2));
  } else {
    memo.set(n, 1 + countSteps(3 * n + 1));
  }

  return memo.get(n)!;
}

const totalSteps = numbers.reduce((acc, n) => acc + countSteps(parseInt(n, 10)), 0);

console.log(`total=${totalSteps}`);
