const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | null = null;
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w, 10);
    if (Number.isNaN(n) || !Number.isFinite(n)) continue;
    count++;
    if (!max || n > max) {
      max = n;
    }
  }
  console.log(`count=${count} max=${max}`);
});
