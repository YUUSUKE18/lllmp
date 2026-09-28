const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_count = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // 1 に到達するまでの手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n)!;
    return;
  }

  // 再帰的計算とメモ化
  let count = 0;
  let current_n = n;
  const path = new Set<number>(); // サイクル検出用

  while (current_n !== 1) {
    if (path.has(current_n)) {
      // サイクル検出。このサイクル内の計算はスキップし、合計には影響しない（問題の制約上、1に到達するパスのみを数える）
      // ただし、この問題は「1に到達するまでの手数」を求めるため、サイクルに陥った場合は無限ループまたは非効率になる可能性があるが、
      // 3n+1問題では必ず1に収束するため、ここではサイクル検出は主にメモ化の効率化のためと考える。
      // サイクルに陥った場合は、その経路の計算は終了とする。
      break;
    }
    path.add(current_n);

    if (current_n % 2 === 0) {
      current_n /= 2;
    } else {
      current_n = 3 * current_n + 1;
    }
    count++;
  }

  if (current_n === 1) {
    // 1に到達した場合、計算した手数を加算
    total_count += count;
    memo.set(n, count);
  } else {
    // サイクルに陥った場合、メモ化はしない（到達不可能または計算不能と見なす）
    // 実際には3n+1問題は必ず1に収束するため、このケースは発生しないはずだが、念のため
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
