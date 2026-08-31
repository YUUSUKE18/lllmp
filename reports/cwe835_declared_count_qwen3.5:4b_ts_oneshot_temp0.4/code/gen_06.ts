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
      if (!Number.isNaN(n)) {
        count = n;
      }
      continue;
    }
    
    // 2 行目以降: 整数を読み込む
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;
    
    try {
      const val = BigInt(trimmedLine);
      sum += val;
      count++;
    } catch {
      // 整数として解釈できない場合は無視
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
