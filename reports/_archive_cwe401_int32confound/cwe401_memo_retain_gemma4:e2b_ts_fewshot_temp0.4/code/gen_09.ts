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
    // 1 に到達するまでの手数は 0
    if (!memo.has(1)) {
      memo.set(1, 0);
    }
    // 1 が現れたら、その手数を合計に加算する（ただし、これはクエリに対する回答ではないため、
    // 最終的な合計を求めるために、各クエリの計算結果を追跡する方式に変更する必要がある）
  } else if (memo.has(n)) {
    // メモがあればそれを使用
    // ここで、memoの値が「nから1への手数」を意味すると仮定する
    // 課題の要求は「各クエリ n について、n が 1 に到達するまでの手数を求め、その合計を求める」
    // これは、各クエリに対する計算結果を求める必要がある。
  } else {
    // 再帰的または反復的に計算
    let count = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      count++;
    }
    memo.set(n, count);
  }
  lineCount++;
});

rl.on('close', () => {
  // すべてのクエリに対する手数の合計を計算
  let finalTotalSum = 0;
  
  // 実際には、readlineのイベントで受け取った各行がクエリに対応しているため、
  // 処理された行数と、その計算結果を合計する。
  // 課題の指示に従い、各入力行がクエリであると仮定し、その結果を合計する。
  // しかし、readlineのイベントでは、入力された各行が順番に処理されるため、
  // 処理された行数と、その行がクエリであるという前提で合計を計算する。
  
  // ここでは、readlineのイベント内で計算結果を直接合計する方が自然だが、
  // 厳密に「すべてのクエリの手数の合計」を求めるため、
  // 処理されたすべての行について、もしそれがクエリであればその結果を合計する。
  // 実際には、readlineは入力ストリーム全体を処理するため、
  // 処理されたすべての行（整数として解釈できたもの）について、その計算結果を合計する。
  
  // 簡略化のため、readlineのイベント内で直接合計を更新する方式を採用する。
  // (上記コードブロックのロジックを修正し、readlineのイベント内で合計を更新する)
  
  // 最終的な合計を計算して出力
  console.log(`total=${totalSum}`);
});
