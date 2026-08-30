const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const token of s.split(",")) {
    if (token.trim() === "") continue;
    
    // 空白のみのトークンもスキップ（trim で空になるためカバーされるが、明確にする）
    const trimmed = token.trim();
    if (!trimmed) continue;

    try {
      const n = parseInt(trimmed, 10);
      
      // NaN や Infinity が発生しないか確認 (parseInt は通常数値を返すので OK)
      if (Number.isNaN(n)) continue;

      count++;
      if (first || n > max) {
        max = n;
        first = false;
      }
    } catch (e) {
      // 解析エラーの場合もスキップ（ただし parseInt は通常 throw しないのでこれは防御的）
      continue;
    }
  }

  console.log(`count=${count} max=${max}`);
});
