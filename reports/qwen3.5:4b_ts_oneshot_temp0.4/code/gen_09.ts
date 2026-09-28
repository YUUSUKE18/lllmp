const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  const uniqueNumbers = new Set<number>();
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length === 0) continue;
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) continue;
    uniqueNumbers.add(n);
  }
  let count = 0;
  let sum = 0n;
  for (const num of uniqueNumbers) {
    count++;
    sum += BigInt(num);
  }
  console.log(`count=${count} sum=${Number(sum)}`);
});
