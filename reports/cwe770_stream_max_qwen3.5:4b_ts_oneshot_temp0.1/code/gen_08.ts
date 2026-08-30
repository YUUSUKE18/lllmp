const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxVal = Number.MIN_SAFE_INTEGER;
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    count++;
    if (count === 1 || n > maxVal) {
      maxVal = n;
    }
  }
  console.log(`count=${count} max=${maxVal}`);
});
