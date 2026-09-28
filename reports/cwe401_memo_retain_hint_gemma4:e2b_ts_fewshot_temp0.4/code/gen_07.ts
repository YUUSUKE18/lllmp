const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_number = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    const count = 0;
    total_count += count;
    // 1は既にmemo化されている（または計算済み）
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 再帰または反復計算
  let steps = 0;
  let current = n;

  while (current !== 1) {
    if (memo.has(current)) {
      // 途中でメモ化された値に到達した場合
      steps += memo.get(current)!;
      break;
    }

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達した後の処理
  if (current === 1) {
    // 1に到達するまでの手数を計算し、メモ化する
    // ここでのstepsは、nから1に到達するまでの操作回数
    memo.set(n, steps);
    total_count += steps;
  } else {
    // 理論上、この問題は必ず1に収束する（コネルの予想）が、
    // 念のため無限ループ防止のために処理を続ける
    // この問題の制約上、これは発生しないはず
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
