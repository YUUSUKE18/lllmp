const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token, 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      count++;
      if (maxVal === null || n > maxVal) {
        maxVal = n;
      }
    } catch (_) {} // 解析エラーの場合も無視する（parseInt が例外をスローしないが、防御的）
  }

  console.log(`count=${count} max=${maxVal}`);
});
