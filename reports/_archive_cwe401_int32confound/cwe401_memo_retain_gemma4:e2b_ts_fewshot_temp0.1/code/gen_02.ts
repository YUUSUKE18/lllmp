const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    const result = 0;
    if (!memo.has(1)) {
      memo.set(1, result);
    }
    // 1が入力された場合、その結果を合計に加算するのではなく、
    // 最終的な合計を求めるため、ここでは何もしない（または、
    // 1がクエリとして与えられた場合の処理を考える）
    // 仕様に基づくと、各クエリ n について操作を繰り返し1に到達するまでの手数を求め、その合計を求める。
    // ここでは、入力された各 n に対して計算し、その結果を合計する。
    totalSum += result;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    totalSum += memo.get(n)!;
    return;
  }

  // 再帰的または反復的に計算
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

  // 結果をメモ化し、合計に加算
  memo.set(n, steps);
  totalSum += steps;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
