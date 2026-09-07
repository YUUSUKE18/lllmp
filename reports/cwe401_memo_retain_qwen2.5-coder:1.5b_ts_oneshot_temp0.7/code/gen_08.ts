import { readFileSync } from 'fs';

const data = readFileSync(process.stdin.fd).toString('utf8').trim().split(/\s+/);

const memo = new Map<number, number>();

const calculateSteps = (n: number): number => {
  if (memo.has(n)) return memo.get(n)!;
  if (n === 1) return 0;
  if (n % 2 === 0) return 1 + calculateSteps(n / 2);
  return 1 + calculateSteps(3 * n + 1);
};

const totalSteps = data.reduce((acc, n) => {
  const n = parseInt(n, 10);
  if (isNaN(n)) return acc;
  memo.set(n, calculateSteps(n));
  return acc + memo.get(n)!;
}, 0);

console.log(`total=${totalSteps}`);
