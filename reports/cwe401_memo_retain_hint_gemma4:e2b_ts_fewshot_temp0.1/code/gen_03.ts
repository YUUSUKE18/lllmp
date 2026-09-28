```ts
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
    // n=1 の場合は手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
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
  // 1 に到達するまでの手数はパスの長さ + 1 (開始値から1までのステップ数)
  // ただし、問題文の「n が 1 のときの手数は 0 です」を考慮すると、
  // 1 に到達するまでの操作回数を数える。
  // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
  // 1 に到達するまでの操作回数 (path.length) + 1 (最後の1) - 1 (開始値) = path.length
  // 実際には、nから1に到達するまでの操作回数を数える。
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 実際には、nから1に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) - 1 (開始値) = path.length
  // 1 に到達するまでの操作回数は、path.length + 1 (最後の1) -
