const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = null as number | null;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = Number(f);
      if (!Number.isNaN(n) && Number.isFinite(n) && Math.floor(n) !== n) continue;
      
      count++;
      if (max === null || n > max) {
        max = n as number;
      }
    } catch {
      // 解析エラーの場合はスキップ（ただし、Number(f) が NaN であれば上記のチェックで除くため、ここでは安全に処理）
    }
  }

  console.log(`count=${count} max=${max}`);
});
