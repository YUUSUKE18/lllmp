const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo: Record<number, number> = {};

let total = 0;

rl.on('line', (line: string) => {
  const n: number = parseInt(line.trim(), 10);
  if (isNaN(n) || n <= 0) return;

  if (memo[n] !== undefined) {
    total += memo[n];
    return;
  }

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

  memo[n] = steps;
  total += steps;
});

rl.close();
console.log(`total=${total}`);
