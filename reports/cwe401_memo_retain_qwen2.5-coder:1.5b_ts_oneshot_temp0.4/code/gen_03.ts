import { readFileSync } from 'fs';

const data = readFileSync('input.txt', 'utf8').split('\n');
const memo: Record<number, number> = {};

function collatzSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];
  memo[n] = collatzSteps(n % 2 === 0 ? n / 2 : 3 * n + 1) + 1;
  return memo[n];
}

let totalSteps = 0;
for (const line of data) {
  const n = parseInt(line.trim(), 10);
  if (!isNaN(n)) {
    totalSteps += collatzSteps(n);
  }
}

console.log(`total=${totalSteps}`);
