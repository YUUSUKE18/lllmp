const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  const lines = s.split(/\r?\n/);
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    // 1 行目:整数の個数
    if (count === 0 && /^\s*-\d+\s*$/.test(line)) {
      const parts = line.split(/\s+/);
      count = parseInt(parts[parts.length - 1].trim(), 10);
      continue;
    }

    // 2 行目以降:整数の読み取り
    const n = parseInt(line.trim(), 10);
    if (!Number.isNaN(n)) {
      sum += BigInt(n);
      count++;
    }
  }
  
  console.log(`count=${count} sum=${sum}`);
});
