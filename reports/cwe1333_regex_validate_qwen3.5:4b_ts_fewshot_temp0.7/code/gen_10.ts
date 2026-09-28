const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let valid = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (/[^0-9,]/.test(trimmed)) {
      continue;
    }
    const parts = trimmed.split(",");
    for (const p of parts) {
      const num = parseInt(p.trim(), 10);
      if (Number.isNaN(num)) continue;
    }
    valid++;
  }
  console.log(`valid=${valid}`);
});
