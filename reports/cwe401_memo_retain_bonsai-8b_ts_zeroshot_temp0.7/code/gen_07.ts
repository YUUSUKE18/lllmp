const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const memo = new Map<number, number>();

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  if (!n || isNaN(n) || n <= 0) return;

  const count = memo.get(n) || 0;
  const result = count + (n === 1 ? 0 : 1 + (n % 2 ? 3 * n + 1 : n / 2) + count);
  memo.set(n, result);

  const total = 0;
  let current = n;
  while (current !== 1) {
    total += result;
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
  }

  console.log(`total=${total}`);
});

rl.close();
