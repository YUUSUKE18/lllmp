const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  
  if (lines.length > 0) {
    const firstLine = parseInt(lines[0].trim(), 10);
    if (!Number.isNaN(firstLine)) count = BigInt(firstLine);
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    try {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        count++;
        sum += BigInt(n);
      }
    } catch {
      // 整数として解釈できない行は無視
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
