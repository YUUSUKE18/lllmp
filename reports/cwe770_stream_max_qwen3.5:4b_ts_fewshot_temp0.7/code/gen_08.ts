const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | null = null;

  for (const ch of s.split(",")) {
    if (!ch.trim()) continue;
    try {
      const val = parseInt(ch, 10);
      if (!Number.isNaN(val)) {
        count++;
        if (maxVal === null || val > maxVal) {
          maxVal = val;
        }
      }
    } catch (_) {}
  }

  console.log(`count=${count} max=${maxVal}`);
});
