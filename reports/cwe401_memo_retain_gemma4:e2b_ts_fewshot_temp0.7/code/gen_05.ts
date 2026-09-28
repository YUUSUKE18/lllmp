const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo: Map<number, number> = new Map();
let total_steps = 0;
let line_count = 0;

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (trimmedLine === "") return;

  const n = parseInt(trimmedLine, 10);

  if (!isNaN(n)) {
    if (n === 1) {
      // n=1 の場合、手数は 0
      const steps = 0;
      total_steps += steps;
    } else if (!memo.has(n)) {
      // 再帰的または動的計画法で計算。今回はメモ化再帰またはループで計算する。
      // 1に到達するまでの手数を求める。
      let current = n;
      let steps = 0;
      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
      }
      
      // メモ化
      memo.set(n, steps);
    } else {
      // 既に計算済みの場合はメモから取得
      total_steps += memo.get(n)!;
    }
  }
  line_count++;
});

rl.on('close', () => {
  // すべてのクエリが処理された後、合計を出力
  console.log(`total=${total_steps}`);
});
