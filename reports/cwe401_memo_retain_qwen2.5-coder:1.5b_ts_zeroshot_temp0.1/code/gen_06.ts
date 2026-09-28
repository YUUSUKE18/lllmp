import { readLine } from 'process';

let memo: { [key: number]: number } = {};

const solve = (n: number): number => {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];

  const result = n % 2 === 0 ? solve(n / 2) : solve(3 * n + 1);
  memo[n] = result + 1;
  return result + 1;
};

let total = 0;

readLine().then((input) => {
  const queries = input.split('\n').filter(Boolean);

  queries.forEach((query) => {
    const n = parseInt(query, 10);
    total += solve(n);
  });

  console.log(`total=${total}`);
});
