const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const memo = new Map<number, number>;

rl.question('Enter integers (one per line, or end of file): ', line => {
  if (!line.trim()) return;

  const n = parseInt(line.trim(), 10);
  if (isNaN(n) || n < 1) return;

  if (memo.has(n)) {
    console.log(`Total for ${n}: ${memo.get(n)}`);
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

  memo.set(n, steps);
  console.log(`Total for ${n}: ${steps}`);

  if (line.trim() !== 'end of file') {
    rl.prompt('Enter integers (one per line, or end of file): ');
  } else {
    rl.close();
    console.log(`Total: ${memo.values().reduce((sum, val) => sum + val, 0)}`);
  }
});
