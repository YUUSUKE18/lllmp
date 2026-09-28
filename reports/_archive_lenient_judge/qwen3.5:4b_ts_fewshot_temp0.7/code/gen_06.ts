const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const uniqueSet = new Set<number>();
  let sum = BigInt(0);

  for (const w of s.split(",")) {
    if (!w.trim()) continue;
    try {
      const n = parseInt(w, 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      uniqueSet.add(n);
      sum += BigInt(n);
    } catch (_) {
      // 解析エラーの場合は無視
    }
  }

  console.log(`count=${uniqueSet.size} sum=${sum}`);
});
