const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);

  if (isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    totalCount += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    totalCount += memo.get(n)!;
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
  // 1 に到達するまでの手数はパスの長さ + 1 (開始地点から1への移動回数)
  // ただし、問題文の「n が 1 のときの手数は 0 です」を考慮すると、
  // 1 に到達するまでの操作回数として、パスの長さが適切。
  // 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
  // 3 -> 10 (1回)
  // 10 -> 5 (2回)
  // 5 -> 16 (3回)
  // ...
  // 1 に到達するまでの操作回数を数える。
  // 1 に到達するまでの操作回数 = path.length + 1 (最後の1への移動)
  // 実際には、操作を繰り返した回数なので、path.length が操作回数となる。
  // 例: n=3. path=[3, 10, 5, 16, 8, 4, 2]. length=7. 1に到達。
  // 3 -> 10 (1)
  // 10 -> 5 (2)
  // 5 -> 16 (3)
  // ...
  // 2 -> 1 (7)
  
  // 1 に到達するまでの操作回数は、パスの長さ (nから1までのステップ数)
  steps = path.length;

  // メモに追加
  memo.set(n, steps);
  totalCount += steps;
});

rl.on('close', () => {
  console.log(`total=${totalCount}`);
});
