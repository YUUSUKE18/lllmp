import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
let memo: { [key: number]: number } = {};

const solve = (n: number): number => {
  if (n in memo) return memo[n];
  if (n === 1) return 0;
  memo[n] = solve(n % 2 === 0 ? n / 2 : 3 * n + 1);
  return memo[n];
};

const total = input
  .split("\n")
  .map((query) => {
    const n = parseInt(query, 10);
    if (n > 0) return solve(n);
  })
  .reduce((a, b) => a + b, 0);

console.log(`total=${total}`);
