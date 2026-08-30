const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

const memo = new Map<number, number>();
let total_count = 0;
let line_number = 0;

rl.on('line', (line) => {
  if (line.trim() === "") return;

  const n = parseInt(line.trim(), 10);

  if (Number.isNaN(n)) return;

  if (n === 1) {
    // n=1 の場合は手数は 0
    total_count += 0;
    return;
  }

  // メモ化された値があればそれを使用
  if (memo.has(n)) {
    total_count += memo.get(n);
    return;
  }

  // 再帰または動的計画法で計算
  let steps = 0;
  let current = n;
  const path = new Set<number>(); // サイクル検出用

  while (current !== 1) {
    if (path.has(current)) {
      // サイクル検出。サイクル内の移動は、サイクルに入った時点からのステップ数を考慮する必要があるが、
      // この問題は1に到達するまでの最短経路を求めるため、サイクルに入ったらその経路をスキップし、
      // サイクル内の移動で1に到達するか、またはサイクルが1を含まない場合は無限ループになる。
      // ここでは、サイクルが1を含まない限り、1に到達しないため、このケースは通常発生しない（3x+1問題の文脈では1に収束する）。
      // サイクル検出は、同じ値が再出現した場合に、その値が1に到達するまでのステップ数を計算するのに役立つ。
      // ただし、この問題は「1に到達するまでの手数」を求めるため、サイクル検出は、
      // サイクルが1に到達しないことを確認するのに役立つ。
      // 3x+1問題では、サイクルは必ず1を含む（4, 2, 1）。
      // サイクル検出は、より複雑な問題（例えば、サイクル内のステップ数を求める）で重要になるが、ここでは単純に再帰/メモ化で十分。
      // 念のため、サイクルに入ったら計算を中断し、メモ化をスキップする。
      break;
    }
    path.add(current);

    if (current % 2 === 0) {
      current = current / 2;
    } else {
      current = 3 * current + 1;
    }
    steps++;
  }

  // 1に到達した場合
  if (current === 1) {
    total_count += steps;
    memo.set(n, steps);
  } else {
    // サイクルに陥った場合（この問題の制約上、通常は発生しないが、安全のため）
    // サイクル検出が正しく機能していれば、このブロックは到達しないはず。
    // もし到達した場合、それは無限ループまたは問題の誤解を示唆する。
    // ここでは、サイクル検出が正しく機能していることを前提とし、到達しない場合は何もしない。
  }
});

rl.on('close', () => {
  console.log(`total=${total_count}`);
});
