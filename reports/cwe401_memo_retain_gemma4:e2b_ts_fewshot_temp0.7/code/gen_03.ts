const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    // ただし、問題文の記述「n が 1 のときの手数は 0 です。」に従い、
    // 操作の過程で1に到達するまでの手数を求める。
    // n=1からスタートする場合、手数は0。
    // ここでは、nが1のときの手数は0として扱う。
    const steps = 0;
    total_steps += steps;
    return;
  }

  // メモ化された値があるかチェック
  if (memo.has(n)) {
    total_steps += memo.get(n);
    return;
  }

  // 再帰的または反復的に計算
  let current = n;
  let steps = 0;
  const path: number[] = [];

  while (current !== 1) {
    if (memo.has(current)) {
      // 途中でメモ化された値に到達した場合、その差分を加算して終了
      steps += memo.get(current);
      break;
    }
    path.push(current);

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  if (current === 1) {
    // 1に到達したときのステップ数を計算し、メモ化
    const final_steps = steps;
    memo.set(n, final_steps);
    total_steps += final_steps;
  } else {
    // 理論上、この問題では1に到達することが保証されているが、念のため
    // サイクルに陥った場合の処理（今回は不要だが）
  }
});

rl.on('end', () => {
  console.log(`total=${total_steps}`);
});
