const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  if (line.trim() === '') return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n) || n < 1) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    totalCount += 0;
    return;
  }

  if (memo.has(n)) {
    // メモ化された値があればそれを使用
    totalCount += memo.get(n)!;
    return;
  }

  // 計算とメモ化
  let steps: number;
  if (n % 2 === 0) {
    steps = n / 2;
  } else {
    steps = 3 * n + 1;
  }

  // 再帰的に呼び出す（または直接計算して再帰的な構造をシミュレート）
  // この問題は「1に到達するまでの手数」を求めるため、再帰的または動的計画法で考える。
  // ここでは、与えられた操作を繰り返して1に到達するまでのステップ数を求める。

  // 再帰的なアプローチ（メモ化を活用）
  if (n > 1) {
    const nextN = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    const subSteps = (memo.has(nextN) ? memo.get(nextN) : 0) + 1;
    memo.set(n, subSteps);
    totalCount += subSteps;
  }
});

rl.on('close', () => {
  console.log(`total=${totalCount}`);
});
