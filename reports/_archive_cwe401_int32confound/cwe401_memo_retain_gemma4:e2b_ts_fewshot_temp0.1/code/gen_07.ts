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
    // n=1 の場合は手数は 0
    const count = 0;
    total_count += count;
    // 1 は既に計算済みだが、念のためメモに追加
    memo.set(1, 0);
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // 再帰的計算とメモ化
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
  // 1 に到達するまでのステップ数はパスの長さ + 1 (最後の1を含む)
  // または、操作の回数を数える。ここでは操作の回数を数える。
  // 1 に到達するまでの操作回数を数える。
  // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
  // pathの要素数は n から 1 までの遷移数を表す。
  steps = path.length + 1;

  // パスを遡ってメモ化
  for (let i = path.length - 1; i >= 0; i--) {
    memo.set(path[i], steps - (path.length - i));
  }
  memo.set(n, steps);
  total_count += steps;
});

rl.on('end', () => {
  console.log(`total=${total_count}`);
});
