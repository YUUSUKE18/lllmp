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
  if (isNaN(n)) return;

  if (n === 1) {
    // nが1のときの手数は0
    total_steps += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_steps += memo.get(n)!;
    return;
  }

  // 再帰的または反復的に計算
  let steps = 0;
  let current_n = n;
  const path: number[] = [];

  while (current_n !== 1) {
    path.push(current_n);
    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
  }
  
  // 1に到達するまでのステップ数はパスの長さ (1が最後に到達する)
  // n=1の場合は0ステップ
  steps = path.length;

  // メモに追加
  memo.set(n, steps);
  total_steps += steps;
});

rl.on('close', () => {
  console.log(`total=${total_steps}`);
});
