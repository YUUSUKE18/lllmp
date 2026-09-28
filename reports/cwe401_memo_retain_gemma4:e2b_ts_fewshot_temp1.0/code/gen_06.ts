const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合の処理。この操作の回数を数えるのではなく、到達するまでの手数を求める
    // n=1 の場合は 0 回の手数なので、この場合は 0 を計算する。
    // ただし、問題文の「n が 1 のときの手数は 0 です」を適用する。
    // ここでは、n を操作するまでのステップ数を数える。
    // n=1 は既に到達しているので、操作回数は 0。
    // もし n=1 を入力された場合、操作は不要なので 0 とする。
    const steps = 0;
    totalCount += steps;
    return;
  }

  let currentN = n;
  let steps = 0;

  // メモ化を使用して計算を高速化
  let path: number[] = [];
  let tempN = n;

  while (tempN !== 1) {
    if (memo.has(tempN)) {
      // メモから結果を取得し、現在のステップ数を加算
      const memoValue = memo.get(tempN)!;
      steps += memoValue;
      break;
    }

    // 3n+1 または n/2 の操作
    if (tempN % 2 === 0) {
      tempN /= 2;
    } else {
      tempN = 3 * tempN + 1;
    }
    steps++;
    path.push(tempN); // これはスタックとして保持するが、ここでは主にメモ化に使う
  }

  if (tempN === 1) {
    // 1 に到達したときのステップ数をメモに追加
    // 実際には、n から 1 に到達するまでの操作回数を計算し、その合計を求める必要がある。
    // ここでは、n が初めて現れた時の計算を記録する方針で進める。
    
    // 再帰的またはループでステップ数を直接計算し、メモに追加する方が確実。
    // 再計算してステップ数を求める（メモ化の仕組みを再構築）
    
    let count = 0;
    let temp = n;
    while (temp !== 1) {
      if (temp % 2 === 0) {
        temp /= 2;
      } else {
        temp = 3 * temp + 1;
      }
      count++;
    }
    
    // メモに追加 (n から 1 への手数を記録)
    memo.set(n, count);
    totalCount += count;
  }
});

rl.on('end', () => {
  // すべての入力が処理された後、結果を出力
  console.log(`total=${totalCount}`);
});
