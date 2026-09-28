const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = 0n;
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    
    // 1 行目の整数の個数を読み取る
    if (count === 0 && parts.length > 0) {
      const n = parseInt(parts[0], 10);
      if (!Number.isNaN(n)) {
        count = BigInt(n);
      }
      continue;
    }
    
    // 2 行目以降の整数を読み込む
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (Number.isNaN(n)) continue;
      sum += BigInt(n);
      count++;
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
