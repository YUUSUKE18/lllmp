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
    // n=1 の場合は手数は 0
    const count = 0;
    total_count += count;
    line_count++;
    return;
  }

  // メモ化された値があるか確認
  if (memo.has(n)) {
    const count = memo.get(n)!;
    total_count += count;
    line_count++;
    return;
  }

  // 再帰的計算とメモ化
  if (n % 2 === 0) {
    // n が偶数なら n/2
    const next_n = n / 2;
    const count = 1 + memo.get(next_n)!;
    memo.set(n, count);
    total_count += count;
    line_count++;
  } else {
    // n が奇数なら 3n+1
    const next_n = 3 * n + 1;
    const count = 1 + memo.get(next_n)!;
    memo.set(n, count);
    total_count += count;
    line_count++;
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
