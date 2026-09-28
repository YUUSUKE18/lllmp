const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let target = 0, pairs = 0;
  const parts = s.split(/\s+/);
  for (const f of parts) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (isNaN(n)) continue;
    if (n === target) pairs++;
    else if (n > target) pairs = 0;
  }
  if (pairs > 0) pairs = pairs * 2;
  console.log(`pairs=${pairs}`);
});
