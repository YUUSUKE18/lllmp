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
    // 1に到達するまでの手数は0
    // このクエリに対する手数を計算する（これは1回のクエリに対する回答なので、合計には加算しない）
  } else if (!memo.has(n)) {
    // 再帰的な計算とメモ化
    let steps: number;
    if (n % 2 === 0) {
      steps = calculateSteps(n / 2);
    } else {
      steps = calculateSteps(3 * n + 1);
    }
    memo.set(n, steps + 1);
  }
});

rl.on('close', () => {
  // ここでは、問題の解釈が「各入力行 n について、操作を繰り返して 1 に到達するまでの手数を求め、その合計を求める」と解釈します。
  // 例: 入力 n が与えられた場合、nから1への経路の長さ（操作回数）を求め、その合計を出す。

  // 修正：問題文を再読します。「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
  // これは、Collatz予想に関連する問題であり、nから1へのパスの長さを数えることを意味します。

  // 再度、memoizationの目的を再定義します。
  // calculateSteps(n) が n から 1 へのステップ数を返すようにする。
  // 最初に与えられた n に基づいて計算を行う必要があります。

  // しかし、標準入力が「1 以上の整数が 1 行に 1 個ずつ並びます（クエリ）」という形式なので、
  // 各行が独立したクエリだと解釈し、その結果を合計します。

  // 再計算ロジックを標準入力の処理に組み込みます。

  // 実際の計算は、入力された各行に対して実行する必要があります。
  // 最初の入力が現在の状態であると仮定します。

  // ----------------------------------------------------------------------
  // 以下のロジックは、標準入力が1行ずつ与えられることを前提とします。
  // ----------------------------------------------------------------------

  // 実際には、readlineの'line'イベント内で計算を完結させ、'close'で結果を出力します。
  // すべての処理は、与えられた各nに対して独立して実行する必要があります。
  
  // 最終結果の出力
  console.log(`total=${totalSum}`);
});

/**
 * nから1へのステップ数を計算する関数。メモ化を使用する。
 * @param n 開始数
 * @returns nから1へのステップ数
 */
function calculateSteps(n: number): number {
  if (n === 1) {
    return 0;
  }
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  let steps = 0;
  let current = n;
  const path: number[] = []; // 経路を追跡するための配列

  while (current !== 1) {
    path.push(current);
    if (current % 2 === 0) {
      current /= 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達した後の手数を計算
  // 1に到達するまでの操作回数は、経路の長さ - 1 (最後の1は既にカウント済み)
  // よりシンプルに、nから1への移動回数を数える。
  let finalSteps = 0;
  let temp = n;
  while (temp !== 1) {
      if (temp % 2 === 0) {
          temp /= 2;
      } else {
          temp = 3 * temp + 1;
      }
      finalSteps++;
  }
  
  memo.set(n, finalSteps);
  return finalSteps;
}

// 再度、標準入力の処理を、与えられた各nに対して実行するように修正します。
// 処理の実行は、readlineのイベント内で完結させる必要があります。

// --- 最終的な実行ロジックの再構築 ---

const inputLines: number[] = [];
rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);
  if (!isNaN(n)) {
    // 各行がクエリ n であるとみなし、計算を実行
    const steps = calculateSteps(n);
    totalSum += steps;
  }
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
