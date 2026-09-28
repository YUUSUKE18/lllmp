const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = BigInt(0);

  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f, 10);
      if (isNaN(n) || !Number.isInteger(n)) continue;
      
      // Set に追加（重複除外）
      nums.add(n);

      // Sum に加算 (BigInt で計算して範囲オーバーフロー防止)
      sum += BigInt(n);
    } catch {
      // 解析エラー時の無視
    }
  }

  console.log(`count=${nums.size} sum=${sum}`);
});
