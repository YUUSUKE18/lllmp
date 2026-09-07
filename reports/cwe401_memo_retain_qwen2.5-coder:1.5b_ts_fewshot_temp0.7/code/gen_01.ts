import { readFileSync } from 'fs';

const data = readFileSync(process.stdin.fd, 'utf-8').trim();
let memo = new Map<number, number>();
let total = 0;

function calculateSteps(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n === 1) return 0;

  const steps = n % 2 === 0 ? calculateSteps(n / 2) : calculateSteps(3 * n + 1);
  memo.set(n, steps + 1);
  return steps + 1;
}

for (const line of data.split('\n')) {
  const n = parseInt(line.trim(), 10);
  if (!isNaN(n) && n > 0) {
    const steps = calculateSteps(n);
    total += steps;
  }
}

console.log(`total=${total}`);
