const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") return;

  const n = parseInt(trimmedLine, 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // これは個別のクエリの答えではなく、この状態からの手数を表すため、
    // 最終的な合計計算に影響を与えない（次のステップで評価される）
  } else if (!memo.has(n)) {
    // 再帰/メモ化による計算
    if (n % 2 === 0) {
      // n が偶数なら n/2
      memo.set(n, 1 + calculate_steps(n / 2));
    } else {
      // n が奇数なら 3n+1
      memo.set(n, 1 + calculate_steps(3 * n + 1));
    }
  }

  // この問題は、入力された各数 n について、1 に到達するまでの手数を求め、その合計を求める問題です。
  // 提示された操作は、コナーの数列（3n+1問題）の変形です。
  // 求めたいのは、与えられた各数 n から 1 に到達するまでのステップ数です。
  // この問題の指示は「n が 1 のときの手数は 0」であり、「すべてのクエリの手数の合計」を求めることです。
  // これは、各入力行 n に対して、nを操作して1になるまでのステップ数を計算し、その合計を求めることを意味します。

  // 再計算のためのヘルパー関数（メモ化を適用）
  // ただし、問題文の「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
  // は、通常の3n+1問題のステップ数を問うていると解釈するのが自然です。
  // 1に到達するまでのステップ数を計算し、その合計を求めます。

  // ここでは、再帰的なステップ計算を実装し、メモ化を適用します。

  let steps = 0;
  let current_n = n;

  while (current_n !== 1) {
    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    steps++;
  }
  
  total_steps += steps;
});

rl.on('end', () => {
  console.log(`total=${total_steps}`);
});
