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

  if (Number.isNaN(n) || n <= 0) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    const count = 0;
    totalSum += count;
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
  let current = n;
  const history = new Set<number>();
  let iteration = 0;

  while (current !== 1) {
    if (history.has(current)) {
      // サイクル検出。これは問題の性質上発生しないはずだが、安全策として。
      // 今回の操作はCollatz予想に関連しており、必ず1に収束すると仮定する。
      break; 
    }
    
    history.add(current);
    
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達した後のステップ数を記録（サイクル検出やメモ化のために、到達までの総ステップ数を計算する）
  // ここでは、nから1に到達するまでの操作回数を数える。
  // 1に到達するまでの過程で、各ステップ数を加算する。
  
  // 再計算: 1に到達するまでの手数を求める
  let count = 0;
  let temp = n;
  while (temp !== 1) {
    if (temp % 2 === 0) {
      temp = temp / 2;
    } else {
      temp = 3 * temp + 1;
    }
    count++;
  }

  // メモ化
  memo.set(n, count);
  totalSum += count;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
