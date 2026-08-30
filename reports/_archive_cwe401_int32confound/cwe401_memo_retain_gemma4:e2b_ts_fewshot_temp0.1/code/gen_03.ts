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
    const currentCount = 0;
    totalSum += currentCount;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const count = memo.get(n)!;
    totalSum += count;
    return;
  }

  // 再帰的または反復的に計算
  let steps = 0;
  let currentN = n;

  while (currentN !== 1) {
    if (currentN % 2 === 0) {
      currentN = currentN / 2;
    } else {
      currentN = 3 * currentN + 1;
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
