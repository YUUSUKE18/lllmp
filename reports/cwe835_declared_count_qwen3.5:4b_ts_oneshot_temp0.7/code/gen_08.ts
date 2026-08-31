const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let count = 0;
  let sum: bigint = 0n;
  let readCount = 0;

  for (const line of lines) {
    if (line.trim() === "") continue;
    
    if (readCount === 0) {
      const parts = line.split(/\s+/);
      if (parts.length > 0) {
        const n: bigint = BigInt(parts[0]);
        readCount = Number(n);
      }
      continue;
    }

    const trimmed = line.trim();
    if (trimmed === "" || isNaN(Number(trimmed))) continue;
    
    const val: bigint = BigInt(trimmed);
    
    if (readCount !== 0 && readCount > -1) {
      sum += val;
      count++;
      readCount--;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
