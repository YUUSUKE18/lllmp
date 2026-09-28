import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').trim();
let memo: Record<number, number> = {};
let total = 0;

function calculateSteps(n: number): number {
  if (n in memo) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) return memo[n] = 1 + calculateSteps(n / 2);
  return memo[n] = 1 + calculateSteps(3 * n + 1);
}

for (const line of input.split('\n')) {
  const n = parseInt(line, 10);
  if (n === 0) break;
  total += calculateSteps(n);
}

console.log(`total=${total}`);
