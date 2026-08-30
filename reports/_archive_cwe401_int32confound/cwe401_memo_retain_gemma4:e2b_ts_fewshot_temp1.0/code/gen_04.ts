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
  if (line.trim() === '') return;

  const n = parseInt(line.trim(), 10);
  if (isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    if (!memo.has(1)) {
      memo.set(1, 0);
    }
    // 1 のクエリに対する結果は 0
    // ここでは、各クエリ n の結果を計算し、その合計を求める必要があるため、
    // n の処理をここで行う。
    // しかし、問題の記述は「各クエリ n について、操作を繰り返し、1 に到達するまでの手数を求め、すべてのクエリの手数の合計を求めよ」なので、
    // ここで各クエリ n の結果を求める必要がある。
  }

  // 再帰的または反復的に n を 1 に到達させる過程を計算する関数
  function findSteps(currentN: number): number {
    if (currentN === 1) {
      return 0;
    }
    if (memo.has(currentN)) {
      return memo.get(currentN)!;
    }

    let steps = 0;
    let current = currentN;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    memo.set(currentN, steps);
    return steps;
  }

  const result = findSteps(n);
  totalSum += result;
  lineCount++;

  // 全ての入力が読み終わったら出力する
  rl.on('close', () => {
    console.log(`total=${totalSum}`);
  });
});
