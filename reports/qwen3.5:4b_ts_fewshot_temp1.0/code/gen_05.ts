const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",").map((x) => parseInt(x.trim(), 10)).filter((n) => !Number.isNaN(n));
  const uniqueSet = new Set<number>(parts);
  let count = 0;
  let sum = BigInt(0);
  for (const v of uniqueSet) {
    count++;
    sum += BigInt(v);
  }
  console.log(`count=${count} sum=${sum.toString()}`);
});
