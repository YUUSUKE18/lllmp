const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const target = parseInt(s.split(/\s+/)[0], 10);
  let pairs = 0, first = true, sum = 0;
  for (const f of s.split(/\s+/)) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n)) continue;
    if (first) { first = false; sum = n; continue; }
    sum += n;
    if (sum >= target) {
      pairs++;
      sum = 0;
    }
  }
  console.log(`pairs=${pairs}`);
});
