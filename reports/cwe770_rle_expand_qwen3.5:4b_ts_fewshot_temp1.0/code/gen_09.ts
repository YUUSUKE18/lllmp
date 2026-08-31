const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let c = 0n, nSum = 0n;
  for (const p of s.split(",")) {
    const parts = p.trim().split(":");
    if (parts.length !== 2) continue;
    const valStr = parts[0].trim();
    const cntStr = parts[1].trim();
    const n = BigInt(parseInt(valStr, 10));
    const m = BigInt(parseInt(cntStr, 10));
    if (n > 0n && m >= 0n) {
      c += m;
      nSum += n * m;
    }
  }
  console.log(`count=${c} sum=${nSum}`);
});
