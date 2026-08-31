const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    // 1 行目: 整数の個数を読み取る
    if (count === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        count = n;
      }
      continue;
    }
    
    // 2 行目以降: 整数を読み込む
    const parts = line.split(/\s+/);
    for (const part of parts) {
      if (part.trim() === "") continue;
      const val = BigInt(part);
      if (!Number.isNaN(Number(val.toString()))) {
        sum += val;
        count++;
      }
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
