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
    if (parts.length === 0) continue;

    const n = parseInt(parts[0], 10);
    if (Number.isNaN(n)) continue;

    for (const f of parts.slice(1)) {
      if (f.trim() === "") continue;
      const val = BigInt(parseInt(f, 10));
      sum += val;
      count++;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
