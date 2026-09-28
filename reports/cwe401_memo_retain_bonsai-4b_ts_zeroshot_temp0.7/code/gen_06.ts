const readline = require('readline');
const { createMemoizedFunction } = require('lodash'); // メモ化用の関数

const memo = new createMemoizedFunction((n: number): number => {
  if (n === 1) return 0;
  if (n % 2 === 0) return memo(n / 2) + 1;
  return memo(3 * n + 1) + 1;
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line: string) => {
  const n = parseInt(line, 10);
  if (isNaN(n) || n <= 0 || n > 2**63) return;
  if (n === 1) return;
  const steps = memo(n);
  rl.close();
});

rl.on('close', () => {
  const total = Object.keys(memo).map(k => memo(parseInt(k, 10))).reduce((sum, key) => sum + memo(parseInt(key, 10)), 0);
  console.log(`total=${total}`);
});
