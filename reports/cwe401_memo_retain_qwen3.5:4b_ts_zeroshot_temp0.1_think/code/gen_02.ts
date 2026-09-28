const readline = require('readline');

const memo = new Map<bigint, bigint>();
let totalSteps = 0n;

const calculateSteps = (n: bigint): bigint => {
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  if (n === 1n) {
    memo.set(n, 0n);
    return 0n;
  }

  let nextN = n;
  if (n % 2n === 0n) {
    nextN = n / 2n;
  } else {
    nextN = 3n + 1n;
  }

  const steps = 1n + calculateSteps(nextN);
  memo.set(n, steps);
  return steps;
};

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed || !/^-?\d+$/.test(trimmed)) {
    return;
  }

  const n = BigInt(trimmed);
  if (n < 1n) return;

  totalSteps += calculateSteps(n);
});

rl.on('close', () => {
  console.log(`total=${totalSteps}`);
});
