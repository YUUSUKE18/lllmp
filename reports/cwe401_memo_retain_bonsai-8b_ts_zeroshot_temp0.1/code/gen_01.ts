import { Readable, ReadTextEvent } from 'stream';

const input = Readable.from(process.stdin);

const memo = new Map<number, number>();

function collate(input: string): number[] {
  return input
    .split(/\r?\n/)
    .filter(line => {
      const num = parseInt(line, 10);
      return !isNaN(num) && num >= 1;
    })
    .map(line => num => parseInt(line, 10));
}

function steps(n: number): number {
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
}

const collateStream = input.pipe(collate);

collateStream
  .pipe((line) => {
    const numbers = line.split(/\r?\n+/);
    const results = numbers
      .map(num => {
        const parsed = parseInt(num, 10);
        if (parsed === undefined || parsed < 1) return undefined;
        const steps = steps(parsed);
        return steps;
      })
      .filter(result => result !== undefined);

    const total = results.reduce((sum, val) => sum + val, 0);
    console.log(`total=${total}`);
  });
