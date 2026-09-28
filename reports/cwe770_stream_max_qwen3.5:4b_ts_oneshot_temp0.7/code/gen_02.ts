const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: number | null = null;
  for (const f of s.split(",")) {
    if (/^\s*$/.test(f.trim())) continue;
    try {
      const n = parseInt(f.trim(), 10);
      if (!Number.isNaN(n) && Number.isFinite(n)) {
        count++;
        if (max === null || n > max) {
          max = n as number;
        }
      }
    } catch (_) {}
  }
  console.log(`count=${count} max=${max}`);
});
