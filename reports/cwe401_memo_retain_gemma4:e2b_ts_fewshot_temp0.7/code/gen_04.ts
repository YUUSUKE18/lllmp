const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    const steps = 0;
    memo.set(n, steps);
    totalCount += steps;
  } else if (!memo.has(n)) {
    // 再帰的または反復的に計算
    let currentN = n;
    let count = 0;
    const path: number[] = [];

    while (currentN !== 1) {
      if (memo.has(currentN)) {
        // メモ化された値があればそこから計算を続ける
        count += memo.get(currentN);
        break;
      }
      path.push(currentN);
      if (currentN % 2 === 0) {
        currentN = currentN / 2;
      } else {
        currentN = 3 * currentN + 1;
      }
      count++;
    }

    // 経路上のノードをメモ化する
    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];
      // 経路上の各ノードについて、1に到達するまでの手数を計算し、パスを遡ってメモ化する
      // ここでは、現在の計算結果を直接メモ化するのではなく、再帰的な構造を考慮して、
      // 遷移を辿って最終的な手数を求めるのが最も直接的。
      // ただし、ここでは「各クエリ n について、n が 1 に到達するまでの手数を求め」というタスクなので、
      // n から 1 への最短経路（ステップ数）を求める問題として解釈する。

      // 再帰/メモ化の構造を再構築: n -> f(n) の遷移
      let steps = 0;
      let tempN = n;
      const stack: { n: number, steps: number }[] = [{ n: n, steps: 0 }];
      const visited = new Set<number>();
      visited.add(n);

      while (tempN !== 1) {
        if (visited.has(tempN)) {
          // サイクル検出（ただし、この問題は通常1に収束するため発生しないはずだが、念のため）
          // 今回の操作はコネルの予想問題であり、1に収束することが保証されている。
          break;
        }
        if (tempN % 2 === 0) {
          tempN = tempN / 2;
        } else {
          tempN = 3 * tempN + 1;
        }
        steps++;
        stack.push({ n: tempN, steps: steps });
        visited.add(tempN);
      }

      if (tempN === 1) {
        // 1に到達したときのステップ数を記録
        memo.set(n, steps);
        totalCount += steps;
      }
    }

  } else {
    // 既に計算済みの値があればそれを使う
    const steps = memo.get(n)!;
    totalCount += steps;
  }
});

rl.on('close', () => {
  console.log(`total=${totalCount}`);
});
