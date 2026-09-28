import { readLine } from 'process';

let memo: { [key: number]: number } = {};

function calculateSteps(n: number): number {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  if (n % 2 === 0) {
    memo[n] = 1 + calculateSteps(n / 2);
  } else {
    memo[n] = 1 + calculateSteps(3 * n + 1);
  }
  return memo[n];
}

let totalSteps = 0;

readLine().on('data', (input) => {
  const n = parseInt(input.trim(), 10);
  if (n > 0) {
    totalSteps += calculateSteps(n);
  }
});

readLine().on('end', () => {
  console.log(`total=${totalSteps}`);
});
