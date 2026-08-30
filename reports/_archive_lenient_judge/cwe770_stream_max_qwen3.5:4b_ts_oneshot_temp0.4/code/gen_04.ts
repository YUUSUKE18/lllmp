const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let max = Number.MIN_SAFE_INTEGER;
  let count = 0;
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    try {
      const n = parseInt(f, 10);
      if (Number.isNaN(n) || !isFinite(n)) continue;
      max = Math.max(max, n);
      count++;
    } catch (_) {}
  }
  console.log(`count=${count} max=${max}`);
});
