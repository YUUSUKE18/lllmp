import { readline } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo = new Map<number, number>();

rl.on('line', line => {
  const n = parseInt(line.trim());
  if (isNaN(n) || n <= 0) return;

  if (memo.has(n)) {
    const steps = memo.get(n);
    console.log(`total=${steps}`);
    return;
  }

  let current = n;
  let steps = 0;

  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }

    steps++;
    if (current > 0 && !memo.has(current)) {
      memo.set(current, steps);
    }
  }

  console.log(`total=${steps}`);
  memo.set(n, steps);
});

rl.close();
