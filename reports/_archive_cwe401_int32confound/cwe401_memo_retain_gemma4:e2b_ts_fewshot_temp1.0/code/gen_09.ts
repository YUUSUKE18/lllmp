const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let inputLines: string[] = [];
rl.on('line', (line) => {
  inputLines.push(line.trim());
});

rl.on('close', () => {
  let totalCount: number = 0;
  const memo: Map<number, number> = new Map();

  // 関数を定義してメモ化を実装
  const countSteps = (n: number): number => {
    if (n === 1) {
      return 0;
    }
    if (memo.has(n)) {
      return memo.get(n)!;
    }

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

    memo.set(n, steps);
    return steps;
  };

  // 全ての入力行を処理
  for (const line of inputLines) {
    if (line === "") continue;

    const n = parseInt(line, 10);

    if (!isNaN(n) && n >= 1) {
      const steps = countSteps(n);
      totalCount += steps;
    }
  }

  // 結果の出力
  console.log(`total=${totalCount}`);
});
