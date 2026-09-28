import { stdin, process } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let memo = new Map<number, number>();

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  if (isNaN(n) || n < 1) return;

  if (memo.has(n)) {
    console.log(`total=${memo.get(n)}`);
    return;
  }

  let count = 0;
  let current = n;

  while (current !== 1) {
    count++;
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }

  memo.set(n, count);
  console.log(`total=${count}`);
});

rl.on('close', () => {
  console.log(`total=${memo.size}`);
});
