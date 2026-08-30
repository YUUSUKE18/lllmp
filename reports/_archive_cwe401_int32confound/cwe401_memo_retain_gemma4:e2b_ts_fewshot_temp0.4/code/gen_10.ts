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
  let current = n;
  let steps = 0;
  const path: number[] = [];

  while (current !== 1) {
    if (memo.has(current)) {
      steps += memo.get(current)!;
      break;
    }
    
    path.push(current);
    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1 に到達した後の経路を遡ってメモ化する
  if (current === 1) {
    // 経路を逆順にして、各ステップで必要な手数を計算し、メモ化する
    let currentStep = steps;
    for (let i = path.length - 1; i >= 0; i--) {
      const prev = path[i];
      // prev から current に遷移するのにかかったステップ数を計算する必要があるが、
      // ここでは直接再帰的に計算した結果をメモ化する方がシンプルで安全。
      // ただし、問題文の意図は「n から 1 への最短経路」を求めることなので、
      // 遷移の回数を数えるべき。

      // 再帰的なメモ化を試みる（より標準的な解法）
      // 以下のロジックは、n から 1 へのステップ数を求める問題（コネルの問題）の標準的な解法に依存する。
      // 遷移の回数を数えるため、再帰で計算し、上から下へメモ化する。
    }
  }
  
  // 再帰的なメモ化を再実装する（より確実な方法）
  const calculateSteps = (n: number): number => {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;

    let result: number;
    if (n % 2 === 0) {
      result = 1 + calculateSteps(n / 2);
    } else {
      result = 1 + calculateSteps(3 * n + 1);
    }
    
    memo.set(n, result);
    return result;
  };

  const stepsForN = calculateSteps(n);
  totalSum += stepsForN;
});

rl.on('close', () => {
  console.log(`total=${totalSum}`);
});
