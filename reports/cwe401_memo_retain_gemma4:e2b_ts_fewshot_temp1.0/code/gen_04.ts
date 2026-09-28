const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let totalCount = 0;
let lineCount = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;
  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 のときの手数は 0
    const count = 0;
    totalCount += count;
    // 1回の処理で答えを出すわけではないため、ここでは結果を保持しない
  } else if (!memo.has(n)) {
    // 再帰計算とメモ化
    let count = 0;
    let currentN = n;
    
    // 1に到達するまでの手数を計算する関数
    const calculateSteps = (start: number): number => {
      if (start === 1) return 0;
      if (memo.has(start)) return memo.get(start)!;

      let steps = 0;
      let current = start;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
      }
      
      // 経路に沿ったメモ化（ここでは単純な再帰の形ではなく、経路全体の結果を計算する必要があるため、
      // 通常のCollatz問題のメモ化とは少し異なるアプローチが必要。
      // しかし、この問題は「nから1へ到達するまでの手数」を求めるので、再帰/メモ化で十分。
      
      // 経路上のすべての値について計算結果をメモ化する
      // 今回は、あくまで与えられたnについて、1に到達するまでのステップ数を求める。
      // ここでは、関数が返す値のみをメモ化する。
      
      // 簡単のため、再帰的なメモ化を採用する
      const result = calculateSteps(current) + 1;
      memo.set(start, result);
      return result;
    };
    
    // 最初に n から計算を開始
    const steps = calculateSteps(n);
    totalCount += steps;
  }
});

rl.on('close', () => {
  console.log(`total=${totalCount}`);
});
