const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    
    try {
      const n = parseInt(token, 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      
      count++;
      if (!first || n > max) {
        max = n;
        first = false;
      }
    } catch {
      // 解析エラーを無視
    }
  }

  console.log(`count=${count} max=${max}`);
});
