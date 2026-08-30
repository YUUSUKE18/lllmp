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

  if (isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 再帰的または反復的に計算
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
  // 1 に到達するまでの手数はパスの長さ + 1 (開始値 n から 1 までのステップ数)
  // ただし、n=1 の場合は 0 ステップ。n > 1 の場合は path.length + 1
  // 例: n=3 -> 3, 10, 5, 16, 8, 4, 2, 1 (8ステップ)
  // path.length は n から 1 までの遷移の数。
  // 1 に到達するまでの手数は path.length + 1 (n から始まる)
  // 実際には、n から始めて 1 に到達するまでの操作回数なので、path.length + 1 が正しい。
  // ただし、n=1 の場合は 0。
  steps = path.length + 1;

  // メモに追加して合計に加算
  memo.set(n, steps);
  total_count += steps;
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
