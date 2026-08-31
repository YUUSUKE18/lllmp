const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = s.split(/\r?\n/);
  let totalLines = 0;
  let sumVal = 0;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    let n: number | null = null;
    for (const p of parts) {
      try {
        n = parseInt(p, 10);
        if (!Number.isNaN(n)) break;
      } catch {}
    }
    if (n === null) continue;
    totalLines++;
    sumVal += n;
  }
  console.log(`count=${totalLines} sum=${sumVal}`);
});
