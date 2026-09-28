const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let n: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      n = parsed;
      break;
    }
  }

  let count = 0;
  let sum: bigint = 0n;

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    for (const p of parts) {
      if (!/^-?\d+$/.test(p)) continue;
      const val = BigInt(Number(p));
      sum += val;
      count++;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
