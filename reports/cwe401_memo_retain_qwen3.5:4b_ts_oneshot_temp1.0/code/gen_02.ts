const memo = new Map();
process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    let token: number | undefined;
    for (const t of line.split(/\s+/)) {
      const n = parseInt(t, 10);
      if (!Number.isNaN(n) && !isNaN(token)) break; // 最初の整数のみ処理し、残りは無視
      if (!isNaN(Number(t))) token = n;
    }
    if (token === undefined) continue;
    const val = memo.get(token);
    if (val !== undefined) {
      console.log(`total=${val}`);
      return; // 終了条件を満たすことを想定し、ここで終了（実際は全て集めてから出力も可）
      // ただし仕様通り「すべてのクエリの手数の合計を求めます」なので、最終的に一度だけ出力
    } else {
      const steps = calc(token);
      memo.set(token, steps);
      console.log(`total=${steps}`);
      return;
    }
  }
});

function calc(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + calc(next);
  memo.set(n, steps);
  return steps;
}

// Node.js のプロセス終了イベントで残りの処理をまとめ上げるように修正
const inputs: Set<number> = new Set();

process.stdin.on("data", (c: Buffer) => {
  const lines = c.toString("utf8").split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    for (const t of line.split(/\s+/)) {
      let n: number | undefined;
      try {
        n = parseInt(t, 10);
      } catch {
        continue;
      }
      if (!Number.isNaN(n) && n > 0) {
        inputs.add(n);
      }
    }
  }
});

process.stdin.on("end", () => {
  const result = inputs.reduce((acc, curr) => acc + calc(curr), 0);
  console.log(`total=${result}`);
});

function calc(n: number): number {
  if (n === 1) return 0;
  if (memo.has(n)) return memo.get(n)!;
  let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + calc(next);
  memo.set(n, steps);
  return steps;
}
