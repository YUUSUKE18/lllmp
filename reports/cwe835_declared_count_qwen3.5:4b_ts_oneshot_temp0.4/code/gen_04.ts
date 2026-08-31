const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length < 1) continue;
    const n = parseInt(parts[0], 10);
    if (Number.isNaN(n)) continue;
    for (const f of parts.slice(1)) {
      if (f.trim() === "") continue;
      const val = BigInt(f.trim());
      count++;
      sum += val;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
