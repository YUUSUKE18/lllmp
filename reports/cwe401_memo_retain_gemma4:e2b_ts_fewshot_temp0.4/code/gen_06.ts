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
    // 1 に到達したときのステップ数は 0
    const steps = 0;
    memo.set(n, steps);
    total_steps += steps;
  } else if (!memo.has(n)) {
    // 再帰または動的計画法で計算
    let current_n = n;
    let steps = 0;
    const path = new Set<number>(); // サイクル検出用

    while (current_n !== 1) {
      if (path.has(current_n)) {
        // サイクル検出。この問題の操作は必ず 1 に収束するため、
        // サイクルに陥ることは通常ないが、念のため。
        // サイクル内のステップ数を考慮する必要があるが、ここでは単純に到達を試みる。
        // 3n+1問題では、1に収束するため、サイクルは発生しない。
        break;
      }
      path.add(current_n);

      if (current_n % 2 === 0) {
        current_n = current_n / 2;
      } else {
        current_n = 3 * current_n + 1;
      }
      steps++;
    }

    if (current_n === 1) {
      // 1 に到達したときのステップ数をメモ
      memo.set(n, steps);
      total_steps += steps;
    }
  } else {
    // メモ化された値を使用
    total_steps += memo.get(n)!;
  }
  line_count++;
});

rl.on('close', () => {
  console.log(`total=${total_steps}`);
});
