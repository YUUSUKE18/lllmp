const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let total_steps = 0;
  const memo = new Map<number, number>();

  for (const line of lines) {
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (Number.isNaN(n)) continue;

    if (n === 1) {
      // 1 に到達するまでの手数は 0
      total_steps += 0;
      continue;
    }

    // メモ化された値があればそれを使用
    if (memo.has(n)) {
      total_steps += memo.get(n)!;
      continue;
    }

    // 計算とメモ化
    let current = n;
    let steps = 0;
    const path = new Set<number>(); // サイクル検出用

    while (current !== 1) {
      if (path.has(current)) {
        // サイクルに陥った場合、到達不可能または無限ループ（この問題では1に到達するため、これは通常発生しないが安全のため）
        // 実際には3n+1問題は必ず1に収束するため、このケースは理論上発生しない。
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

    if (current === 1) {
      total_steps += steps;
      // 経路上のすべての値についてメモ化を更新する（より効率的なメモ化のため）
      let backtrack = n;
      for (let i = steps; i >= 0; i--) {
        if (i === 0) {
          memo.set(n, 0);
        } else if (i % 2 === 0) {
          // 逆操作: x = 2y (y = 2x)
          const prev = backtrack * 2;
          if (prev === n) {
            memo.set(prev, memo.get(n)! + 1);
          }
          backtrack = prev;
        } else {
          // 逆操作: x = (y - 1) / 3 (y = (x - 1) / 3)
          const prev = (backtrack - 1) / 3;
          if (prev === n) {
            memo.set(prev, memo.get(n)! + 1);
          }
          backtrack = prev;
        }
      }
    }
  }

  console.log(`total=${total_steps}`);
});
