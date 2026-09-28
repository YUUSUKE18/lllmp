import { readLine } from 'process';

let memo: { [key: number]: number } = {};

const solve = (n: number): number => {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  memo[n] = 1 + (n % 2 === 0 ? solve(n / 2) : solve(3 * n + 1));
  return memo[n];
};

let total = 0;

readLine().then((input) => {
  const queries = input.split('\n').filter(Boolean).map(Number);

  queries.forEach((n) => {
    total += solve(n);
  });

  console.log(`total=${total}`);
});
