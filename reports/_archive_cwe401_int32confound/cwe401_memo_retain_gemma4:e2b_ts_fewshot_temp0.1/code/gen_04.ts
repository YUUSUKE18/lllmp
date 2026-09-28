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
    // 1 に到達するまでの手数は 0
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
  const path: number[] = [];

  while (currentN !== 1) {
    if (memo.has(currentN)) {
      steps += memo.get(currentN)!;
      break;
    }
    
    path.push(currentN);
    if (currentN % 2 === 0) {
      currentN = currentN / 2;
    } else {
      currentN = 3 * currentN + 1;
    }
    steps++;
  }

  // 1 に到達した後の経路を遡ってメモ化する
  let current = n;
  let currentSteps = 0;
  for (let i = path.length - 1; i >= 0; i--) {
    const next = path[i];
    if (next === 1) {
      memo.set(current, currentSteps + 1);
      break;
    }
    
    if (current % 2 === 0) {
      const nextN = current / 2;
      memo.set(current, memo.get(nextN)! + 1);
      current = nextN;
    } else {
      const nextN = 3 * current + 1;
      memo.set(current, memo.get(nextN)! + 1);
      current = nextN;
    }
    currentSteps++;
  }
  
  // 最終的な計算結果を合計に加算
  if (memo.has(n)) {
    totalSum += memo.get(n)!;
  }
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
