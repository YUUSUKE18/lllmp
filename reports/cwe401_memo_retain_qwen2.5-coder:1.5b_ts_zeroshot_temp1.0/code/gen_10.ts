import { strict as assert } from 'assert';

interface Memo {
  [key: number]: number;
}

function computeSteps(n: number): number {
  if (memo[n]) return memo[n];
  if (n === 1) return 0;
  memo[n] = 1 + (n % 2 === 0 ? computeSteps(n / 2) : computeSteps(3 * n + 1));
  return memo[n];
}

function main() {
  let memo: Memo = {};
  let totalSteps = 0;

  let line;
  while ((line = process.stdin.readLine()) !== null) {
    const n = parseInt(line, 10);
    if (!isNaN(n) && n >= 1) {
      totalSteps += computeSteps(n);
    }
  }

  console.log(`total=${totalSteps}`);
}

main();
