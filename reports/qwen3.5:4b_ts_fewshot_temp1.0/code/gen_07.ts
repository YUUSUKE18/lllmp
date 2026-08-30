const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[\s,]+/);
  const uniqueNums = new Set<number>();
  let sum = 0n;

  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part, 10);
    if (Number.isNaN(n)) continue;
    const numBigInt = BigInt(n);
    uniqueNums.add(numBigInt);
    sum += numBigInt;
  }

  console.log(`count=${uniqueNums.size} sum=${sum}`);
});
