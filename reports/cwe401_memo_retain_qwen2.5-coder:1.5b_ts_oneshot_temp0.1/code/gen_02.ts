import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf8').trim();
const numbers = input.split(/\s+/).filter(Number).map(Number);

const memo: { [key: number]: number } = {};

function calculateSteps(n: number): number {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + calculateSteps(n / 2);
  return 1 + calculateSteps(3 * n + 1);
}

let totalSteps = 0;
for (const num of numbers) {
  totalSteps += calculateSteps(num);
}

console.log(`total=${totalSteps}`);
