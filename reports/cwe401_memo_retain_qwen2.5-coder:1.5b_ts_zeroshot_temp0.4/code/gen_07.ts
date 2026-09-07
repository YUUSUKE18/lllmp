import { readLine } from 'process';

let memo: Record<number, number> = {};

const solve = (n: number): number => {
  if (n === 1) return 0;
  if (memo[n]) return memo[n];
  memo[n] = 1 + (n % 2 === 0 ? solve(n / 2) : solve(3 * n + 1));
  return memo[n];
};

const main = async () => {
  let total = 0;
  while (true) {
    const input = await readLine();
    if (!input) break;
    const n = parseInt(input, 10);
    if (isNaN(n)) continue;
    total += solve(n);
  }
  console.log(`total=${total}`);
};

main();
