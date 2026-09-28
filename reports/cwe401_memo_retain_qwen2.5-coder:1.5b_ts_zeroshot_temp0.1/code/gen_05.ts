import { readLine } from 'process';

let memo: { [key: number]: number } = {};

const solve = (n: number): number => {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  memo[n] = 1 + (n % 2 === 0 ? solve(n / 2) : solve(3 * n + 1));
  return memo[n];
};

let total = 0;
let line = readLine();

while (line) {
  const n = parseInt(line, 10);
  if (!isNaN(n)) {
    total += solve(n);
  }
  line = readLine();
}

console.log(`total=${total}`);
