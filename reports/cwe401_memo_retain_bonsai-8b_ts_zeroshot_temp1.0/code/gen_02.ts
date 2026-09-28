import { Readable } from 'stream';

interface InputRecord {
  value: string;
}

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function collateInput(): InputRecord[] {
  return Array.from(input).filter((line) => {
    const value = parseInt(line.trim());
    return !isNaN(value);
  });
}

function steps(n: number): number {
  if (memo.has(n)) return memo.get(n);
  if (n === 1) return 0;
  let steps = 0;
  let current = n;
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

const queries = collateInput();
let total = 0;
for (const query of queries) {
  total += steps(query);
}

console.log(`total=${total}`);
