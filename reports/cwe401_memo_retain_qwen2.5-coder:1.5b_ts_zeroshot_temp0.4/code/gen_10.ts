import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8').split('\n').filter(Boolean);

let memo = new Map<number, number>();

const processQuery = (n: number): number => {
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  if (n % 2 === 0) {
    memo.set(n, processQuery(n / 2) + 1);
  } else {
    memo.set(n, processQuery(3 * n + 1) + 1);
  }

  return memo.get(n)!;
};

let total = 0;

for (const query of input) {
  const n = parseInt(query, 10);
  total += processQuery(n);
}

console.log(`total=${total}`);
