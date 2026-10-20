const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0, sum = 0, seen = new Set();
  for (const p of parts) {
    p = p.trim();
    if (!p) continue;
    if (/\d+$/.test(p)) {
      const n = parseInt(p, 10);
      if (!seen.has(n)) {
        seen.add(n);
        count++;
      }
      sum += n;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
