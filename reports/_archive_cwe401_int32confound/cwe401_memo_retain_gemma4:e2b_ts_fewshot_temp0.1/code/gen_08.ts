const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSum = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    const result = 0;
    if (!memo.has(1)) {
      memo.set(1, result);
    }
    // この問題では、n=1がゴールなので、n=1のクエリが来た場合は0を計算し、合計に加える
    totalSum += result;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const result = memo.get(n)!;
    totalSum += result;
    return;
  }

  // 再帰的または反復的に計算
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

  // 結果をメモ化し、合計に加算
  memo.set(n, steps);
  totalSum += steps;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
