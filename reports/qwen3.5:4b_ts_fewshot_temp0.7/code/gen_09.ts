const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = new Map<number, number>();
  let sum = BigInt(0);
  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || isNaN(Number(f))) continue;
    if (BigInt(n) > -BigInt(Number.MAX_SAFE_INTEGER + 2e9)) {
      count.set(n, (count.get(n) ?? 0) + 1);
      sum += BigInt(n);
    }
  }
  const total = count.size;
  console.log(`count=${total} sum=${Number(sum.toString())}`);
});
