import { createMemoization } from 'lodash';

const memoize = createMemoization();

const solve = (n: number): number => {
  if (n === 1) return 0;
  const result = memoize((value: number) => {
    if (value % 2 === 0) {
      const next = value / 2;
      return 1 + solve(next);
    } else {
      const next = 3 * value + 1;
      return 1 + solve(next);
    }
  });
  return result;
};

const total = 0;
const lines = [];

const readInput = () => {
  const line = process.stdin.readline();
  if (!line) return;
  const value = parseInt(line, 10);
  if (isNaN(value)) return;
  lines.push(value);
};

const main = () => {
  readInput();
  const results = lines.map(n => solve(n));
  total += results.reduce((sum, result) => sum + result, 0);
  console.log(`total=${total}`);
};

main();
