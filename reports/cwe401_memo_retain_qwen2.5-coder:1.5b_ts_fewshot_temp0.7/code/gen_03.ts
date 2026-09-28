import { readFileSync } from 'fs';
import { strict as assert } from 'assert';

const input = readFileSync('input.txt', 'utf8').trim();
let memo = new Map<number, number>();

function f(n: number): number {
  if (memo.has(n)) return memo.get(n)!;

  if (n % 2 === 0) return memo.set(n, f(n / 2))!;
  return memo.set(n, f(3 * n + 1))!;
}

let total = 0;
for (const line of input.split('\n')) {
  const n = parseInt(line, 10);
  if (n <= 0) continue;
  total += f(n);
}

console.log(`total=${total}`);
