const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let currentInput = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n) || n < 1) {
    return;
  }

  if (n === 1) {
    // n=1 の場合は手数が 0
    const steps = 0;
    totalSum += steps;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const steps = memo.get(n)!;
    totalSum += steps;
    return;
  }

  // 計算
  let steps: number;
  if (n % 2 === 0) {
    steps = n / 2;
  } else {
    steps = 3 * n + 1;
  }

  // 再帰的または反復的に計算し、結果をメモ化する
  // ここでは、n=1に到達するまでの手数を求め、その結果をmemoに保存する
  
  // 再帰的な計算 (memoizationを適用)
  function calculateSteps(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let result: number;
    if (n % 2 === 0) {
      result = calculateSteps(n / 2);
    } else {
      result = 3 * n + 1;
    }

    // この問題は「nが1になるまでの手数」を求めるため、
    // 置き換え操作を適用するのではなく、操作の回数を数える必要がある。
    // 仕様を再解釈: n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求める。
    // これは、Collatz予想の操作と似ているが、置き換えた後の値が新しいnになるか、操作回数を数えるか、またはnが1になるまでのステップ数を数えるか、を明確にする必要がある。

    // 例題の操作を厳密に適用し、nが1になるまでの操作回数を数えると仮定する。
    // nが1のときの手数は0。
    // nが偶数なら n/2、奇数なら 3n+1。これを繰り返す。
    
    let count = 0;
    let currentN = n;
    while (currentN !== 1) {
        if (currentN % 2 === 0) {
            currentN = currentN / 2;
        } else {
            currentN = 3 * currentN + 1;
        }
        count++;
    }
    
    // 最初のnがクエリに対応する値。
    // この場合、このnから1に到達するまでの手数を計算し、合計に加算する。
    memo.set(n, count);
    return count;
  }

  const steps = calculateSteps(n);
  totalSum += steps;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
