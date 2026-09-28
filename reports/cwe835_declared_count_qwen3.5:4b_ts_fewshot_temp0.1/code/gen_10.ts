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
    if (parts.length === 0) continue;
    const first = parseInt(parts[0], 10);
    if (Number.isNaN(first)) continue;
    for (let i = 1; i < parts.length; i++) {
      const val = BigInt(parts[i]);
      if (!val.toString().match(/^-?\d+$/)) continue;
      count++;
      sum += val;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
