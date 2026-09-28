const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const memo = new Map<number, number>(());

let total = 0;

rl.on('line', (line) => {
  const n = parseInt(line, 10);
  if (isNaN(n) || n <= 0) return;

  const steps = computeSteps(n);
  total += steps;

  memo.set(n, steps);
});

function computeSteps(n: number): number {
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

  return steps;
}

rl.close();
