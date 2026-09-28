import { readFileSync } from "fs";

const data = readFileSync("input.txt", "utf8").split(/\s+/);
let memo = new Map<number, number>();

function computeSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  if (n % 2 === 0) {
    memo.set(n, 1 + computeSteps(n / 2));
  } else {
    memo.set(n, 1 + computeSteps(3 * n + 1));
  }

  return memo.get(n)!;
}

let totalSteps = 0;
for (const n of data) {
  if (n.trim() === "") continue;
  const num = parseInt(n, 10);
  if (Number.isNaN(num)) continue;
  totalSteps += computeSteps(num);
}

console.log(`total=${totalSteps}`);
