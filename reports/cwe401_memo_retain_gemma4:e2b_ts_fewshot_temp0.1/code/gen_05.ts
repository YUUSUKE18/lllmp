const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    // このクエリ自体はステップ数を加算しない（nが1のときの手数は0なので）
  } else if (!memo.has(n)) {
    // 再帰または動的計画法で計算
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
    memo.set(n, steps);
  }

  // すべてのクエリの合計を計算
  if (memo.has(n)) {
    total_steps += memo.get(n)!;
  }
  
  line_count++;
});

rl.on('close', () => {
  console.log(`total=${total_steps}`);
});
