import { Readable, ReadArray } from 'stream';

interface Query {
  n: number;
}

const memo = new Map<number, number>();

const processInput = (input: string): Query[] => {
  const lines = input.trim().split('\n');
  return lines
    .filter(line => {
      const num = parseInt(line, 10);
      return !isNaN(num) && num > 0;
    })
    .map(line => num => ({ n: num, count: 0 }));
};

const steps = (n: number): number => {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

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
};

const main = () => {
  const input = processInput(process.stdin);
  let total = 0;

  for (const query of input) {
    const steps = steps(query.n);
    total += steps;
  }

  console.log(`total=${total}`);
};

main();
