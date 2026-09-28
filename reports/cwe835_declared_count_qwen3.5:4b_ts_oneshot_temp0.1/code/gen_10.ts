const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = BigInt(0);
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    // 1 行目: 整数の個数
    if (count === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) count = n;
      continue;
    }
    
    // 2 行目以降: 整数を読み込む
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    
    const parts = trimmedLine.split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      
      // 64bit 整数の範囲内であることを確認（BigInt で安全に扱うため）
      // JavaScript の Number は約 ±9e15 まで正確だが、BigInt は全域対応
      const bigN = BigInt(n);
      sum += bigN;
      count++;
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
