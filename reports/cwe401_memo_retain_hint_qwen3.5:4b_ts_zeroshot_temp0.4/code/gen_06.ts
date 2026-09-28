import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin });

const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;

  let nextN: number;
  let steps: number;

  if (n % 2 === 0) {
    nextN = n / 2;
    steps = 1 + collatzStep(nextN);
  } else {
    nextN = 3 * n + 1;
    steps = 1 + collatzStep(nextN);
  }

  memo.set(n, steps);
  return steps;
}

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed || !/\d+/.test(trimmed)) return;

  const n = parseInt(trimmed, 10);
  if (isNaN(n) || n < 1) return;

  const steps = collatzStep(n);
  console.log(`total=${steps}`);
});

rl.on('close', () => {});
