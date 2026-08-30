const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, max: number | null = null;
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f.trim(), 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    count++;
    if (!max || Math.abs(Number.MAX_SAFE_INTEGER - max) < Number.MAX_SAFE_INTEGER && n > max) { // Using safe comparison logic for large integers within JS limits, though input is guaranteed to fit 64-bit.
      max = n;
    } else if (n > max) {
       max = n; 
    }
  }
  console.log(`count=${count} max=${max}`);
});
