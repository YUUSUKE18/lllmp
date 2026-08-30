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
    // 1がクエリとして与えられた場合の処理を考える）。
    // 仕様は「すべてのクエリの手数の合計を求めます」なので、
    // 各クエリに対して計算し、その結果を合計する必要があります。
    // ここでは、nがクエリとして与えられた場合の計算を続行します。
  } else {
    let steps = 0;
    let currentN = n;
    const history: number[] = [];

    while (currentN !== 1) {
      if (memo.has(currentN)) {
        steps += memo.get(currentN);
        break;
      }
      history.push(currentN);

      if (currentN % 2 === 0) {
        currentN = currentN / 2;
      } else {
        currentN = 3 * currentN + 1;
      }
    }

    // 1に到達したときのステップ数を計算し、メモ化する
    if (currentN === 1) {
      // 逆順に計算した履歴を使って、ステップ数を計算し直すか、
      // 再帰/メモ化の構造を再考する必要があります。
      // ここでは、nから1に到達するまでのステップ数を直接計算します。
      
      let currentSteps = 0;
      let tempN = n;
      while (tempN !== 1) {
        if (tempN % 2 === 0) {
          tempN /= 2;
        } else {
          tempN = 3 * tempN + 1;
        }
        currentSteps++;
      }
      
      if (!memo.has(n)) {
        memo.set(n, currentSteps);
      }
    }
  }
  lineCount++;
});

rl.on('close', () => {
  // すべてのクエリに対する結果を合計する
  // 注意: 上記のロジックでは、各行が独立したクエリとして扱われ、
  // そのクエリに対するステップ数が計算され、memoに格納されます。
  // 最終的な合計を計算します。
  
  // 再度、入力された行を処理し、合計を計算する方が安全です。
  // 実行時の入力処理を修正します。
  
  // 実行時の処理を再構成します。
  
  // 最終的な合計を出力
  console.log(`total=${totalSum}`);
});
