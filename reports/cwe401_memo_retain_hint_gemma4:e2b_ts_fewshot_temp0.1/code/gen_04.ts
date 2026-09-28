const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1に到達するまでの手数は0
    const count = 0;
    total_count += count;
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
  const path: number[] = [];

  while (current !== 1) {
    path.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
  }
  // 1に到達するまでの手数はパスの長さ + 1 (開始値から1までのステップ数)
  // ただし、問題文の「nが1のときの手数は0」を考慮すると、nから1に到達するまでの操作回数を数える。
  // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
  // 1に到達するまでの操作回数を数えるため、path.length + 1 が正しい。
  // ただし、n=1の場合は0なので、n>1の場合の計算結果をtotal_countに加算する。
  // n=1の場合は既に処理済み。
  if (n > 1) {
    const count = path.length + 1;
    total_count += count;
    memo.set(n, count);
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
