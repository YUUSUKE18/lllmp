const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0n;
  for (const p of s.split(",")) {
    if (!p.trim()) continue;
    const [key, val] = p.trim().split(":");
    if (!key || !val) continue;
    const n = Number(key);
    const m = Math.floor(Number(val));
    if (Number.isNaN(n) || Number.isNaN(m)) continue;
    count += m;
    sum += BigInt(n) * BigInt(m);
  }
  console.log(`count=${count} sum=${sum.toString()}`);
});
