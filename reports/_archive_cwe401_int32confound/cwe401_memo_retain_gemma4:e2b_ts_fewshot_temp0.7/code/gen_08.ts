const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let input_lines = [];
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);
  if (!isNaN(n)) {
    input_lines.push(n);
  }
});

rl.on('close', () => {
  // メモ化された関数を定義
  const count_steps = (n: number): number => {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let steps = 0;
    let current = n;
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    memo.set(n, steps);
    return steps;
  };

  // 全クエリの計算と合計
  let total = 0;
  for (const n of input_lines) {
    total += count_steps(n);
  }

  // 結果の出力
  console.log(`total=${total}`);
});
