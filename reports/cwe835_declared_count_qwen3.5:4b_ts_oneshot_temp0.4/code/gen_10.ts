const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = BigInt(0);

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;

    const n = parseInt(parts[0], 10);
    if (Number.isNaN(n)) continue;

    for (const valStr of parts.slice(1)) {
      const v = BigInt(valStr);
      count++;
      sum += v;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
