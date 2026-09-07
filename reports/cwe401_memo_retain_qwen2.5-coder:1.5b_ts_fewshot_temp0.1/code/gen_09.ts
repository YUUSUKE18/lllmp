import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').trim();
const queries = input.split('\n').filter(Boolean);

const memo = new Map<number, number>();

function computeSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  if (n % 2 === 0) {
    memo.set(n, 1 + computeSteps(n / 2));
  } else {
    memo.set(n, 1 + computeSteps(3 * n + 1));
  }

  return memo.get(n)!;
}

let totalSteps = 0;

for (const query of queries) {
  const n = parseInt(query, 10);
  if (n > 0) {
    totalSteps += computeSteps(n);
  }
}

console.log(`total=${totalSteps}`);
