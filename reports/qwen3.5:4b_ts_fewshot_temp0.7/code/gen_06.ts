const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const nums = new Set<number>();
  let sum = 0;
  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w, 10);
    if (Number.isNaN(n)) continue;
    if (!nums.has(n)) {
      nums.add(n);
      sum += n;
    }
  }
  console.log(`count=${nums.size} sum=${sum}`);
});
