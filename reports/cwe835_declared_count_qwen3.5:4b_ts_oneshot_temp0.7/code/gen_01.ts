const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = 0n;

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/).filter(p => p.length > 0);
    if (parts.length === 0) continue;

    const n = BigInt(parts[0]);
    count += n;
    
    for (let i = 1n; i < n; i++) {
      if (i >= parts.length) break;
      const val = BigInt(parts[i]);
      sum += val;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
