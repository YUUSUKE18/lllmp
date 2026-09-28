import * as readline from 'readline';
const rl = readline.createInterface({ input: process.stdin });
const memo = new Map<number, number>();

function collatzStep(n: number): number {
  if (memo.has(n)) return memo.get(n)!;
  let steps = 0;
  while (n !== 1) {
    if (n % 2 === 0) n = n / 2;
    else n = 3 * n + 1;
    steps++;
  }
  memo.set(n, steps);
  return steps;
}

let totalSum = 0n as bigint;

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) return;
    steps = collatzStep(n);
    totalSum += BigInt(steps);
  } catch (e) {}
});

rl.on('close', () => {
  process.stdout.write(`total=${Number(totalSum)}\n`);
});

let steps: number = 0;
