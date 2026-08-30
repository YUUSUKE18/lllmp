const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: number | undefined;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    try {
      const n = parseInt(f.replace(/[^\d-]/g, ""), 10);
      // 数式として解析できない場合は skip (整数ではない場合)
      if (!Number.isNaN(n)) {
        count++;
        if (max === undefined || Number.MAX_SAFE_INTEGER < max - (n > Math.floor(max))) {
            max = n; 
        } else {
            max = Max(max, n); // 修正：単純比較
        }
      } 
    } catch (_) {}
  
  // 再考: parseInt はそのまま使えるが、文字列解析には問題がある。整数のみをカウントし最大値を探す必要がある。

  count = 0; let currentMax: number | undefined;
