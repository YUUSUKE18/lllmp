const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | null = null;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    count++;
    if (!max || n > max) {
      max = n;
    }
  }
  console.log(`count=${count} max=${max}`);
});
