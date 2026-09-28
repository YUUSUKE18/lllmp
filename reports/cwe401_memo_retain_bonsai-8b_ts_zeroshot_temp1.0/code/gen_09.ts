import { Readable, ReadLines } from 'stream';

interface Query {
  n: number;
}

const memo = new Map<number, number>();

function steps(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n);

  let steps = 0;
  let current = n;

  while (current !== 1) {
    steps++;
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
  }

  memo.set(n, steps);
  return steps;
}

function main() {
  const input = Readable.from(process.stdin);
  const lines = input.pipe(ReadLines<{ n: number }>());
  const totals = lines
    .filter(line => {
      const num = parseInt(line, 10);
      if (!isNaN(num) && num > 0) return true;
      return false;
    })
    .map(line => {
      const num = parseInt(line, 10);
      if (!isNaN(num) && num > 0) return steps(num);
      return 0;
    })
    .reduce((a, b) => a + b, 0);

  console.log(`total=${totals}`);
}

main();
