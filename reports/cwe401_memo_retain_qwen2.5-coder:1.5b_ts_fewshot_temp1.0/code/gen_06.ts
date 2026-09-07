import { readFileSync } from 'fs';
import { resolve } from 'path';

// 通常の解法が複雑なため、メモ化を導入
const memo = new Map<number, number>();

const calcSteps = (n: number): number => {
  if (memo.has(n)) return memo.get(n);
  if (n === 1) return 0;
  if (n % 2 === 0) return memo.set(n, 1 + calcSteps(n / 2)), 1 + calcSteps(n / 2);
  return memo.set(n, 1 + calcSteps(3 * n + 1)), 1 + calcSteps(3 * n + 1);
};

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8').trim();
const numbers = input.split(/\s+/).filter(Boolean);

const totalSteps = numbers.reduce((acc, n) => {
  if (Number.isNaN(Number(n))) return acc;
  const steps = calcSteps(Number(n));
  memo.set(Number(n), steps);
  return acc + steps;
}, 0);

console.log(`total=${totalSteps}`);
