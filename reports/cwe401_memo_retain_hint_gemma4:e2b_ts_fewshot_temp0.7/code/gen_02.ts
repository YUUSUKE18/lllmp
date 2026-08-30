const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    total_count += 0;
    return;
  }

  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 偶数なら n/2, 奇数なら 3n+1
  let next_n: number;
  if (n % 2 === 0) {
    next_n = n / 2;
  } else {
    next_n = 3 * n + 1;
  }

  // 再帰的に計算し、メモ化
  const steps = 1 + calculate_steps(next_n);
  memo.set(n, steps);
  total_count += steps;
});

function calculate_steps(n: number): number {
  if (n === 1) {
    return 0;
  }
  if (memo.has(n)) {
    return memo.get(n)!;
  }

  let next_n: number;
  if (n % 2 === 0) {
    next_n = n / 2;
  } else {
    next_n = 3 * n + 1;
  }

  const result = 1 + calculate_steps(next_n);
  memo.set(n, result);
  return result;
}

// 処理の実行はreadlineのイベント駆動で行われるため、ここで終了処理を記述する
// 最終的な合計値は、すべての行が処理された後に計算される。
// ただし、この問題は標準入力から与えられたクエリの合計を求めるため、
// 処理が完了した後に結果を出力する必要がある。

// 上記の処理ロジックは、readlineのイベントドリブンな性質上、
// 最終的な出力が遅延する可能性があるため、
// この問題の要求（標準入力全体を読み、最後に合計を出力）を満たすために、
// 処理完了後に結果を出力する形にする。
// しかし、例題の形式に従うため、ここではreadlineのイベント処理を完了させる。

// 実際には、readlineのイベントが終了したときに total_count を出力するべきだが、
// 課題の形式（1行で出力）と、再帰的なメモ化の構造を考慮すると、
// 処理が完了した後に合計を出力するのが自然である。

// 課題の要求に従い、合計値のみを出力する。
// 上記の処理は、入力が全て読み込まれた後に total_count が確定する。
// 読み込みが完了した後に最終出力を実行する。

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
