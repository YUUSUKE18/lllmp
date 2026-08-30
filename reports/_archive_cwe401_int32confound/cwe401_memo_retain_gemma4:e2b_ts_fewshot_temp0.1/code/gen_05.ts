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
    // 1が入力された場合の処理を別途考える必要があるが、
    // 問題文は「すべてのクエリの手数の合計」を求めているため、
    // 各クエリの結果を計算し、それを合計する流れになる）
    // ここでは、入力された各nに対して計算を行い、その結果を合計する。
    // n=1 の場合、手数は 0。
    totalSum += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    totalSum += memo.get(n)!;
    return;
  }

  // 再帰的または反復的に計算
  let count = n;
  let steps = 0;
  const history = new Set<number>();
  let current = n;

  while (current !== 1) {
    if (history.has(current)) {
      // サイクル検出（ただし、この問題では必ず1に収束するため、これは厳密には不要だが、
      // メモ化の高速化の観点から、もしサイクルが発生した場合の処理を考慮する）
      // この問題の操作はCollatz予想に似ており、1に収束することが保証されている。
      // サイクル検出は、もしnが1に収束しない場合の安全策として残す。
      break;
    }
    history.add(current);

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達したときのステップ数を記録
  if (current === 1) {
    // 経路を遡ってステップ数を計算し直す（または、計算中にステップ数を加算する）
    // ここでは、計算中にステップ数を加算する方が効率的。
    // 再計算が必要な場合は、再帰的なメモ化（DP）がより適切。

    // DP/メモ化による再計算（より安全）
    let currentN = n;
    let steps_n = 0;
    const path: number[] = [];

    while (currentN !== 1) {
      path.push(currentN);
      if (currentN % 2 === 0) {
        currentN /= 2;
      } else {
        currentN = 3 * currentN + 1;
      }
      steps_n++;
    }
    // 1に到達したときのステップ数は、pathの長さ + 1 (最後の1) ではない。
    // 1に到達するまでの操作回数なので、path.length が操作回数。
    // 例: n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
    // path: [3, 10, 5, 16, 8, 4, 2] -> 7ステップ。
    
    const finalSteps = path.length;
    
    // メモに保存
    memo.set(n, finalSteps);
    totalSum += finalSteps;
  }
});

rl.on('close', () => {
  // 最終結果を出力
  console.log(`total=${totalSum}`);
});
