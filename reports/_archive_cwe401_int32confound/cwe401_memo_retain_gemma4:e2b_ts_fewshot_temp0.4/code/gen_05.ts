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
    // n=1 のときの手数は 0
    const steps = 0;
    totalSum += steps;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const steps = memo.get(n)!;
    totalSum += steps;
    return;
  }

  // 再帰または反復計算
  let currentN = n;
  let steps = 0;
  
  // 1 に到達するまでの手数を計算
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
