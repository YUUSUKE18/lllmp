import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const numbers = input.split(/\s+/).map(Number);

const memo = new Map<number, number>();

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n);

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? calculateSteps(n / 2) + 1 : calculateSteps(3 * n + 1) + 1;
  memo.set(n, steps);
  return steps;
}

let totalSteps = 0;

for (const n of numbers) {
  totalSteps += calculateSteps(n);
}

console.log(`total=${totalSteps}`);
