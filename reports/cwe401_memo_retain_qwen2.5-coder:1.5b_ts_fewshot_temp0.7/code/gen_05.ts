import { readFileSync } from 'fs';
import { createInterface } from 'readline';

const input = readFileSync('input.txt').toString().trim().split('\n').filter(Boolean);
const rl = createInterface({ input });

let memo: { [key: number]: number } = {};

function computeSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];
  if (n % 2 === 0) {
    memo[n] = 1 + computeSteps(n / 2);
  } else {
    memo[n] = 1 + computeSteps(3 * n + 1);
  }
  return memo[n];
}

let totalSteps = 0;

rl.on('line', (line) => {
  const n = parseInt(line, 10);
  if (!isNaN(n) && n >= 1) {
    totalSteps += computeSteps(n);
  }
});

rl.on('close', () => {
  console.log(`total=${totalSteps}`);
});
