import { ReadLine } from 'readline';

const rl = new ReadLine({ input: process.stdin });

const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    steps++;
  }

  memo.set(n, steps);
  return steps;
}

function processLine(line: string): number | null {
  const trimmed = line.trim();
  if (trimmed === '') return null;
  const parsed = parseInt(trimmed, 10);
  if (isNaN(parsed)) return null;
  return parsed;
}

let totalSteps = 0;

rl.on('line', (line) => {
  const n = processLine(line);
  if (n !== null) {
    totalSteps += collatzStep(n);
  }
});

rl.on('close', () => {
  console.log(`total=${totalSteps}`);
});
