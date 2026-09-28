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

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    return;
  }

  // ベースケース
  if (n === 1) {
    memo.set(1, 0);
    total_count += 0;
    return;
  }

  // 再帰的計算とメモ化
  if (n % 2 === 0) {
    // n が偶数なら n/2
    const next_n = n / 2;
    const count = memo.get(next_n) + 1;
    memo.set(n, count);
  } else {
    // n が奇数なら 3n+1
    const next_n = 3 * n + 1;
    const count = memo.get(next_n) + 1;
    memo.set(n, count);
  }
});

rl.on('close', () => {
  // 処理が完了した後に合計を出力
  console.log(`total=${total_count}`);
});
