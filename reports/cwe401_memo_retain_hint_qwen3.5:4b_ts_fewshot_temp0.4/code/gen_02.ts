const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const memo: Map<number, number> = new Map();
  let total = 0;

  function collatzStep(n: number): number {
    if (n === 1) return 0;
    if (memo.has(n)) return memo.get(n)!;
    
    let steps = 0;
    while (n !== 1) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      steps++;
    }
    memo.set(n, steps);
    return steps;
  }

  for (const line of s.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    
    // 整数として解釈できるかチェック
    let n: number | null = null;
    const match = trimmed.match(/^-?\d+$/);
    if (match) {
      n = parseInt(match[0], 10);
      if (Number.isNaN(n)) continue;
    } else {
      continue;
    }

    // 64bit 整数範囲内であることを保証するため、BigInt を使用して計算し、結果を number に変換
    let current: bigint = BigInt(n);
    let steps = 0;
    
    while (current !== 1n) {
      if (current % 2n === 0n) {
        current = current / 2n;
      } else {
        current = 3 * current + 1n;
      }
      steps++;
    }

    // 計算結果を number に変換してメモ化（64bit 整数範囲内であれば OK）
    const result = Number(steps);
    memo.set(n, result);
    total += result;
  }

  console.log(`total=${total}`);
});
