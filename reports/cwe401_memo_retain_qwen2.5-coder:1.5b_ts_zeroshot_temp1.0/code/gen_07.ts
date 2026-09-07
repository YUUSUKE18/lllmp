import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let cache: Record<number, number> = {};

async function processQuery() {
  const input = await rl.question('Enter a number: ');
  if (input.trim() === '') {
    return;
  }

  const n = parseInt(input, 10);
  if (n < 1) {
    console.log('Invalid input. Please enter a positive integer.');
    return;
  }

  const total = cache[n] !== undefined ? cache[n] : calculateTotal(n, cache);
  console.log(`total=${total}`);

  processQuery();
}

function calculateTotal(n: number, cache: Record<number, number>): number {
  if (n === 1) {
    return 0;
  }

  const memoKey = n.toString();
  if (cache[memoKey]) {
    return cache[memoKey];
  }

  const nextValue = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const total = 1 + calculateTotal(nextValue, cache);
  cache[memoKey] = total;
  return total;
}

processQuery();
