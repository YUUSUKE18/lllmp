import { readLine } from 'process';

let memo: Record<string, number> = {};

const calculateCollatzSteps = (n: number): number => {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  memo[n] = 1 + (n % 2 === 0 ? calculateCollatzSteps(n / 2) : calculateCollatzSteps(3 * n + 1));
  return memo[n];
};

let totalSteps = 0;

readLine().then((input: string) => {
  for (const num of input.split('\n').filter((line) => line.trim())) {
    const steps = calculateCollatzSteps(parseInt(num));
    totalSteps += steps;
  }

  console.log(`total=${totalSteps}`);
});
