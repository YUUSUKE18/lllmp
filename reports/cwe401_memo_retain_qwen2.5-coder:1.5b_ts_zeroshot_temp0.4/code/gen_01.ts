import { readLine } from 'process';

let memo: { [key: number]: number } = {};

function computeSteps(n: number): number {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const nextStep = n % 2 === 0 ? n / 2 : 3 * n + 1;
  memo[n] = 1 + computeSteps(nextStep);
  return memo[n];
}

let totalSteps = 0;

readLine()
  .on('data', (input) => {
    const n = parseInt(input.trim(), 10);
    if (!isNaN(n)) {
      totalSteps += computeSteps(n);
    }
  })
  .on('end', () => {
    console.log(`total=${totalSteps}`);
  });
