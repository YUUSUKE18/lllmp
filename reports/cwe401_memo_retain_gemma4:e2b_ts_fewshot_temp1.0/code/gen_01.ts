const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;
let currentInput = '';

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") return;

  const n = parseInt(trimmedLine, 10);
  if (!isNaN(n)) {
    if (n === 1) {
      // 1から1に到達するまでの手数は0
      // 1の処理は特に計算に含めないか、あるいは直接処理する
      // ここではn>1のクエリのみを処理する
    } else if (memo.has(n)) {
      // メモ化された結果を使用
      const count = memo.get(n);
      totalCount += count;
    } else {
      // 再帰的に計算し、メモ化する
      if (n % 2 === 0) {
        // nが偶数なら n/2
        const next = n / 2;
        const count = 1 + (memo.get(next) || 0);
        memo.set(n, count);
        totalCount += count;
      } else {
        // nが奇数なら 3n+1
        const next = 3 * n + 1;
        const count = 1 + (memo.get(next) || 0);
        memo.set(n, count);
        totalCount += count;
      }
    }
  }
});

rl.on('close', () => {
  // 標準入力が終了したら結果を出力
  console.log(`total=${totalCount}`);
});
