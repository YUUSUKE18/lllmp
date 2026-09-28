let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (c: string) => {
  input += c;
});

process.stdin.on("end", () => {
  const lines = input.trim().split(/\s+/).filter(line => line.length > 0);
  let totalSteps = 0n;
  const memo = new Map<number, bigint>();

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n < 1) continue;

    if (n === 1) {
      // 手数は 0
      continue;
    }

    // メモ化された値の確認
    if (memo.has(n)) {
      totalSteps += memo.get(n)!;
      continue;
    }

    // 計算とメモ化（操作の繰り返しをシミュレーション）
    let current = n;
    let steps = 0n;
    const visited = new Set<number>();
    const path: number[] = [];

    while (current !== 1 && !visited.has(current)) {
      visited.add(current);
      path.push(current);

      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }

    if (current === 1) {
      // 1に到達したときのステップ数を記録
      for (let i = 0; i < steps; i++) {
        memo.set(path[i], BigInt(i + 1));
      }
      totalSteps += steps;
    }
  }

  console.log(`total=${totalSteps.toString()}`);
});
