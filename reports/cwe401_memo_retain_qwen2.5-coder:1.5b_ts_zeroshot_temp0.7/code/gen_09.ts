import { readFileSync } from 'fs';

function calculateSteps(n: number): number {
  const memo: { [key: number]: number } = {};

  function steps(num: number): number {
    if (memo[num]) return memo[num];
    if (num === 1) return 0;
    if (num % 2 === 0) return 1 + steps(num / 2);
    return 1 + steps(3 * num + 1);
  }

  return steps(n);
}

const input = readFileSync('input.txt', 'utf8').split('\n').filter(Boolean).map(Number);
let totalSteps = 0;

for (const n of input) {
  const stepsCount = calculateSteps(n);
  totalSteps += stepsCount;
}

console.log(`total=${totalSteps}`);
