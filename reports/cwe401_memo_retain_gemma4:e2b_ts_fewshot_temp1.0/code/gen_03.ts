const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalSteps = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") return;

  const n = parseInt(trimmedLine, 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    const steps = 0;
    totalSteps += steps;
    console.log(`total=${totalSteps}`);
    rl.close();
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    const steps = memo.get(n)!;
    totalSteps += steps;
    return;
  }

  // 計算
  let steps: number;
  if (n % 2 === 0) {
    // n が偶数なら n/2
    steps = steps(n / 2);
  } else {
    // n が奇数なら 3n+1
    steps = steps(3 * n + 1);
  }

  // 再帰的に計算し、結果をメモ化する（実際にはループで到達させる）
  // ここでは再帰的な構造を反復的な構造に置き換えるため、適切な再帰またはループが必要です。
  // 今回は直接、1に到達するまでのパスを求めるため、再帰呼び出しを用いて計算します。
  
  // 実際の手数計算ロジックを再定義して、memoized Fibonacci-like Sequenceを計算する
  const calculateSteps = (startN: number): number => {
    if (startN === 1) {
      return 0;
    }
    if (memo.has(startN)) {
      return memo.get(startN)!;
    }

    let result: number;
    if (startN % 2 === 0) {
      result = calculateSteps(startN / 2);
    } else {
      result = calculateSteps(3 * startN + 1);
    }

    memo.set(startN, result);
    return result;
  };
  
  const stepsForN = calculateSteps(n);
  totalSteps += stepsForN;
});

// rl.on('close', () => {
//   // 最終出力は内部で実行されるため、ここでは何もしない
// });
