const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0n; 
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const tokens = line.split(/\s+/);
    for (const t of tokens) {
      const n = parseInt(t, 10);
      if (isNaN(n)) continue;
      count++;
      sum += BigInt(n);
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
